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
    TextControl
} from '@wordpress/components';

export default function Edit( props ) {
    const { attributes, setAttributes } = props;
    const {
        text,
        textPlain,
        url,
		opensInNewTab,
		relNoFollow,
		relSponsored,
		isFullWidth,
        isOutline,
        size,
        styleVariant,
        primaryColor,
        iconName,
        iconPosition,
    } = attributes;

    // Derive current style strictly from the Styles panel (wrapper classes).
    // If no is-style-* class is present, treat as the default: 'primary'.
    const migrate = ( val ) => {
        // Normalize various style slugs (including legacy) to the 4 supported variants
        if ( val === 'primary' ) return 'primary';
        if ( val === 'secondary' ) return 'secondary';
        if ( val === 'outline' ) return 'outline';
        if ( val === 'information' ) return 'information';
        // Legacy mappings from prior style names
        if ( val === 'style-1' ) return 'primary';
        if ( val === 'style-2' ) return 'secondary';
        if ( val === 'style-3' ) return 'information';
        if ( val === 'link' ) return 'outline';
        if ( val === 'tertiary' ) return 'information';
        return val;
    };
    // Read current wrapper classes (includes is-style-*)
    const baseBlockProps = useBlockProps();
    const classStyle = baseBlockProps?.className?.match( /is-style-([\w-]+)/ )?.[ 1 ] || null;
    const currentStyle = migrate( classStyle || styleVariant || 'primary' );

    // Merge our classes with base block props
    const hasIcon = !!iconName;
    const iconSlug = ( iconName || '' ).replace( /^dashicons-/, '' );
    const mergedClassName = [
        baseBlockProps.className,
        'lc-button',
        `lc-button--${ size }`,
        currentStyle ? `lc-button--${ currentStyle }` : '',
        currentStyle === 'primary' && primaryColor ? `lc-button--primary-${ primaryColor }` : '',
        hasIcon ? 'has-icon' : '',
        hasIcon ? `has-icon-${ iconPosition || 'right' }` : '',
        hasIcon ? `has-icon-${ iconSlug }` : '',
        // Only keep supported modifiers; remove legacy is-solid/is-outline flags
        isFullWidth ? 'is-full' : ''
    ].filter( Boolean ).join( ' ' );
    const blockProps = { ...baseBlockProps, className: mergedClassName };

    // Keep attribute in sync so save() gets correct class.
    useEffect( () => {
        if ( currentStyle && currentStyle !== styleVariant ) {
            setAttributes( { styleVariant: currentStyle } );
        }
    }, [ currentStyle ] );

	const rel = [
		opensInNewTab ? 'noopener' : null,
		relNoFollow ? 'nofollow' : null,
		relSponsored ? 'sponsored' : null
	].filter( Boolean ).join( ' ' ) || undefined;

	// renderIcon imported

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


                    { currentStyle === 'primary' && (
                        <SelectControl
                            label={ __( 'Primary Options', 'limecuda' ) }
                            value={ primaryColor }
                            options={ [
                                { label: __( 'Red', 'limecuda' ), value: 'red' },
                                { label: __( 'Blue', 'limecuda' ), value: 'blue' },
                            ] }
                            onChange={ ( val ) => setAttributes( { primaryColor: val } ) }
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

					<ToggleControl
						label={ __( 'Disabled', 'limecuda' ) }
						checked={ attributes.isDisabled }
						onChange={ ( v ) => setAttributes( { isDisabled: v } ) }
					/>
				</PanelBody>

                <PanelBody title={ __( 'Icon', 'limecuda' ) } initialOpen={ false }>
                    <SelectControl
                        label={ __( 'Dashicon', 'limecuda' ) }
                        value={ iconSlug }
                        options={ [
                            { label: __( 'None', 'limecuda' ), value: '' },
                            { label: 'Arrow Right', value: 'arrow-right' },
                            { label: 'Arrow Right Alt', value: 'arrow-right-alt' },
                            { label: 'Arrow Right Alt 2', value: 'arrow-right-alt2' },
                            { label: 'External', value: 'external' },
                            { label: 'Download', value: 'download' },
                        ] }
                        onChange={ ( val ) => setAttributes( { iconName: val } ) }
                    />
                    <TextControl
                        label={ __( 'Custom dashicon slug or class', 'limecuda' ) }
                        help={ __( 'Examples: external, arrow-right, dashicons-download', 'limecuda' ) }
                        value={ iconName }
                        onChange={ ( val ) => setAttributes( { iconName: ( val || '' ).replace( /^dashicons-/, '' ) } ) }
                    />
                    { ( iconName && iconName !== '' ) && (
                        <SelectControl
                            label={ __( 'Icon Position', 'limecuda' ) }
                            value={ iconPosition || 'right' }
                            options={ [
                                { label: __( 'Left', 'limecuda' ), value: 'left' },
                                { label: __( 'Right', 'limecuda' ), value: 'right' },
                            ] }
                            onChange={ ( val ) => setAttributes( { iconPosition: val } ) }
                        />
                    ) }
                </PanelBody>

            </InspectorControls>

            <div { ...blockProps }>
                <a
                    href={ attributes.isDisabled ? undefined : ( url || undefined ) }
                    rel={ rel }
                    target={ attributes.isDisabled ? undefined : ( opensInNewTab ? '_blank' : undefined ) }
                    aria-disabled={ attributes.isDisabled ? 'true' : undefined }
                    tabIndex={ attributes.isDisabled ? -1 : undefined }
                >
                    { ( hasIcon && ( iconPosition || 'right' ) === 'left' ) && (
                        <span className={ `dashicons dashicons-${ iconSlug }` } aria-hidden="true" />
                    ) }
                    <RichText
                        tagName="span"
                        placeholder={ __( 'Button text…', 'limecuda' ) }
                        value={ ( typeof textPlain === 'string' && textPlain !== '' ) ? textPlain : text }
                        onChange={ ( val ) => setAttributes( { textPlain: val, text: val } ) }
                        allowedFormats={ [] }
                    />
                    { ( hasIcon && ( iconPosition || 'right' ) === 'right' ) && (
                        <span className={ `dashicons dashicons-${ iconSlug }` } aria-hidden="true" />
                    ) }
                </a>
            </div>
		</>
	);
}
