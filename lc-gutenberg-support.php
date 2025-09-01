<?php
/**
 * Plugin Name:       LC Gutenberg Support
 * Description:       Example block scaffolded with Create Block tool.
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       lc-gutenberg-support
 *
 * @package Limecuda
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
/**
 * Registers the block using a `blocks-manifest.php` file, which improves the performance of block type registration.
 * Behind the scenes, it also registers all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
 */
function limecuda_lc_gutenberg_support_block_init() {
	/**
	 * Registers the block(s) metadata from the `blocks-manifest.php` and registers the block type(s)
	 * based on the registered block metadata.
	 * Added in WordPress 6.8 to simplify the block metadata registration process added in WordPress 6.7.
	 *
	 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
	 */
	if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
		wp_register_block_types_from_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
		return;
	}

	/**
	 * Registers the block(s) metadata from the `blocks-manifest.php` file.
	 * Added to WordPress 6.7 to improve the performance of block type registration.
	 *
	 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
	 */
	if ( function_exists( 'wp_register_block_metadata_collection' ) ) {
		wp_register_block_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
	}
	/**
	 * Registers the block type(s) in the `blocks-manifest.php` file.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	$manifest_data = require __DIR__ . '/build/blocks-manifest.php';
	foreach ( array_keys( $manifest_data ) as $block_type ) {
		register_block_type( __DIR__ . "/build/{$block_type}" );
	}
}
add_action( 'init', 'limecuda_lc_gutenberg_support_block_init' );

/**
 * Transitional fix: ensure correct variant class from selected block style.
 * This adjusts existing saved content that may contain lc-button--primary
 * regardless of the style chosen. Once posts are re-saved, this is no-op.
 */
function limecuda_lc_button_render_fix( $block_content, $block ) {
    if ( empty( $block_content ) || empty( $block ) || ! is_array( $block ) ) {
        return $block_content;
    }
    if ( empty( $block['blockName'] ) || 'limecuda/button' !== $block['blockName'] ) {
        return $block_content;
    }

    // Determine selected style from wrapper class in the rendered content.
    $style = 'primary';
    if ( preg_match( '/is-style-([a-z0-9_-]+)/i', $block_content, $m ) ) {
        $style = strtolower( $m[1] );
    }

    // Normalize to supported variants.
    $map = array(
        'primary'     => 'primary',
        'secondary'   => 'secondary',
        'outline'     => 'outline',
        'information' => 'information',
        'style-1'     => 'primary',
        'style-2'     => 'secondary',
        'style-3'     => 'information',
        'link'        => 'outline',
        'tertiary'    => 'information',
    );
    $variant = isset( $map[ $style ] ) ? $map[ $style ] : $style;

    // Prefer robust parsing with WP_HTML_Tag_Processor when available.
    if ( class_exists( 'WP_HTML_Tag_Processor' ) ) {
        $processor = new WP_HTML_Tag_Processor( $block_content );
        if ( $processor->next_tag( array( 'tag_name' => 'div', 'class_name' => 'wp-block-limecuda-button' ) ) ) {
            $class_attr = $processor->get_attribute( 'class' );
            $classes    = ' ' . (string) $class_attr . ' ';

            // Remove any old variant classes first.
            $classes = preg_replace( '/\s+lc-button--(?:primary(?:-(?:red|blue))?|secondary|outline|information)\b/i', ' ', $classes );

            // Append the correct variant class.
            $classes .= ' lc-button--' . $variant;

            // If primary, append color; default to 'red' when attribute is absent.
            if ( 'primary' === $variant ) {
                $color = isset( $block['attrs']['primaryColor'] ) && '' !== $block['attrs']['primaryColor']
                    ? strtolower( (string) $block['attrs']['primaryColor'] )
                    : 'red';
                if ( ! in_array( $color, array( 'red', 'blue' ), true ) ) {
                    $color = 'red';
                }
                $classes .= ' lc-button--primary-' . $color;
            }

            // Normalize whitespace.
            $classes = trim( preg_replace( '/\s+/', ' ', $classes ) );
            $processor->set_attribute( 'class', $classes );
            return $processor->get_updated_html();
        }
        // If we didn't find the wrapper, just return original content.
        return $block_content;
    }

    // Fallback regex approach if Tag Processor is not available.
    $block_content = preg_replace_callback(
        '/(<div\b[^>]*\bclass=")(.*?)("[^>]*>)/i',
        function ( $m ) use ( $variant, $block ) {
            $classes = ' ' . $m[2] . ' ';
            $classes = preg_replace( '/\s+lc-button--(?:primary(?:-(?:red|blue))?|secondary|outline|information)\b/i', ' ', $classes );
            $classes .= ' lc-button--' . $variant;
            if ( 'primary' === $variant ) {
                $color = isset( $block['attrs']['primaryColor'] ) && '' !== $block['attrs']['primaryColor']
                    ? strtolower( (string) $block['attrs']['primaryColor'] )
                    : 'red';
                if ( ! in_array( $color, array( 'red', 'blue' ), true ) ) {
                    $color = 'red';
                }
                $classes .= ' lc-button--primary-' . $color;
            }
            $classes = trim( preg_replace( '/\s+/', ' ', $classes ) );
            return $m[1] . $classes . $m[3];
        },
        1
    );

    return $block_content;
}
add_filter( 'render_block', 'limecuda_lc_button_render_fix', 10, 2 );
