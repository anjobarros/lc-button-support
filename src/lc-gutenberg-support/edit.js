import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	BlockControls,
	URLInput
} from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import {
	PanelBody,
	ToggleControl,
	SelectControl,
	__experimentalToolsPanel as ToolsPanel
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const {
		text,
		url,
		opensInNewTab,
		relNoFollow,
		relSponsored,
		isFullWidth,
		isOutline,
		size,
		styleVariant,
		/**
		 * WordPress injects `className` by default (e.g. `is-style-style-2`).
		 * We don't declare it in attributes but we can still read it here.
		 */
		className,
	} = attributes;

	// Keep our `styleVariant` attribute in sync with the selected block style.
	useEffect( () => {
		const match = className?.match( /is-style-(style-[^\s]+)/ );
		const selected = match?.[ 1 ];
		if ( selected && selected !== styleVariant ) {
			setAttributes( { styleVariant: selected } );
		}
	}, [ className ] );

	const blockProps = useBlockProps( {
		className: [
			'lc-button',
			`lc-button--${ size }`,
			styleVariant ? `lc-button--${ styleVariant }` : '',
			isOutline ? 'is-outline' : 'is-solid',
			isFullWidth ? 'is-full' : ''
		].filter( Boolean ).join( ' ' ),
	} );

	const rel = [
		opensInNewTab ? 'noopener' : null,
		relNoFollow ? 'nofollow' : null,
		relSponsored ? 'sponsored' : null
	].filter( Boolean ).join( ' ' ) || undefined;

	return (
		<>
			<BlockControls group="block" />

			<InspectorControls>
				<PanelBody title={ __( 'Button Settings', 'limecuda' ) } initialOpen={ true }>
					<URLInput
						value={ url }
						onChange={ ( newUrl ) => setAttributes( { url: newUrl } ) }
						label={ __( 'Link', 'limecuda' ) }
					/>

					<ToggleControl
						label={ __( 'Open in new tab', 'limecuda' ) }
						checked={ opensInNewTab }
						onChange={ ( v ) => setAttributes( { opensInNewTab: v } ) }
					/>

					<ToggleControl
						label={ __( 'Rel: nofollow', 'limecuda' ) }
						checked={ relNoFollow }
						onChange={ ( v ) => setAttributes( { relNoFollow: v } ) }
					/>

					<ToggleControl
						label={ __( 'Rel: sponsored', 'limecuda' ) }
						checked={ relSponsored }
						onChange={ ( v ) => setAttributes( { relSponsored: v } ) }
					/>

					<SelectControl
						label={ __( 'Size', 'limecuda' ) }
						value={ size }
						options={ [
							{ label: 'Small', value: 'sm' },
							{ label: 'Medium', value: 'md' },
							{ label: 'Large', value: 'lg' },
						] }
						onChange={ ( val ) => setAttributes( { size: val } ) }
					/>

					<ToggleControl
						label={ __( 'Full width', 'limecuda' ) }
						checked={ isFullWidth }
						onChange={ ( v ) => setAttributes( { isFullWidth: v } ) }
					/>

					<ToggleControl
						label={ __( 'Outline style', 'limecuda' ) }
						checked={ isOutline }
						onChange={ ( v ) => setAttributes( { isOutline: v } ) }
					/>
				</PanelBody>

				{/* Empty tools panel to keep sidebar clean */}
				<ToolsPanel label={ __( 'Locked UI', 'limecuda' ) } />
			</InspectorControls>

			<div { ...blockProps }>
				<RichText
					tagName="a"
					placeholder={ __( 'Button text…', 'limecuda' ) }
					value={ text }
					onChange={ ( val ) => setAttributes( { text: val } ) }
					allowedFormats={ [] }
					href={ url || undefined }
					rel={ rel }
					target={ opensInNewTab ? '_blank' : undefined }
				/>
			</div>
		</>
	);
}
