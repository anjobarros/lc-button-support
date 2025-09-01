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
		icon,
		iconPosition,
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

	const renderIcon = ( name ) => {
		if ( ! name || name === 'none' ) return null;
		switch ( name ) {
			case 'arrow-right':
				return (
					<svg className="lc-button__icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<path d="M5 12h14" />
						<path d="M13 5l7 7-7 7" />
					</svg>
				);
			case 'arrow-left':
				return (
					<svg className="lc-button__icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<path d="M19 12H5" />
						<path d="M11 19L4 12l7-7" />
					</svg>
				);
			case 'external':
				return (
					<svg className="lc-button__icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<path d="M14 3h7v7" />
						<path d="M21 3l-9 9" />
						<path d="M14 13v6H4V10h6" />
					</svg>
				);
			default:
				return null;
		}
	};

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

					<SelectControl
						label={ __( 'Icon', 'limecuda' ) }
						value={ icon }
						options={ [
							{ label: __( 'None', 'limecuda' ), value: 'none' },
							{ label: __( 'Arrow Right', 'limecuda' ), value: 'arrow-right' },
							{ label: __( 'Arrow Left', 'limecuda' ), value: 'arrow-left' },
							{ label: __( 'External Link', 'limecuda' ), value: 'external' },
						] }
						onChange={ ( val ) => setAttributes( { icon: val } ) }
					/>

					{ icon !== 'none' && (
						<SelectControl
							label={ __( 'Icon position', 'limecuda' ) }
							value={ iconPosition }
							options={ [
								{ label: __( 'Left', 'limecuda' ), value: 'left' },
								{ label: __( 'Right', 'limecuda' ), value: 'right' },
							] }
							onChange={ ( val ) => setAttributes( { iconPosition: val } ) }
						/>
					) }

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
				<a href={ url || undefined } rel={ rel } target={ opensInNewTab ? '_blank' : undefined }>
					{ icon !== 'none' && iconPosition === 'left' && renderIcon( icon ) }
					<RichText
						tagName="span"
						className="lc-button__label"
						placeholder={ __( 'Button text…', 'limecuda' ) }
						value={ text }
						onChange={ ( val ) => setAttributes( { text: val } ) }
						allowedFormats={ [] }
					/>
					{ icon !== 'none' && iconPosition === 'right' && renderIcon( icon ) }
				</a>
			</div>
		</>
	);
}
