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
    SelectControl
} from '@wordpress/components';

export default function Edit( props ) {
    const { attributes, setAttributes } = props;
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
        primaryColor,
        showInfoIcon,
        showCaret,
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
    const mergedClassName = [
        baseBlockProps.className,
        'lc-button',
        `lc-button--${ size }`,
        currentStyle ? `lc-button--${ currentStyle }` : '',
        currentStyle === 'primary' && primaryColor ? `lc-button--primary-${ primaryColor }` : '',
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

                <PanelBody title={ __( 'Icons', 'limecuda' ) } initialOpen={ false }>
                    <ToggleControl
                        label={ __( 'Show Info icon (left)', 'limecuda' ) }
                        checked={ !!showInfoIcon }
                        onChange={ ( v ) => setAttributes( { showInfoIcon: !!v } ) }
                    />
                    <ToggleControl
                        label={ __( 'Show Caret (right)', 'limecuda' ) }
                        checked={ !!showCaret }
                        onChange={ ( v ) => setAttributes( { showCaret: !!v } ) }
                    />
                </PanelBody>

                {/* Icon feature removed */}

            </InspectorControls>

            <div { ...blockProps }>
                <a
                    href={ attributes.isDisabled ? undefined : ( url || undefined ) }
                    rel={ rel }
                    target={ attributes.isDisabled ? undefined : ( opensInNewTab ? '_blank' : undefined ) }
                    aria-disabled={ attributes.isDisabled ? 'true' : undefined }
                    tabIndex={ attributes.isDisabled ? -1 : undefined }
                >
                    { showInfoIcon && (
                        <span className="lc-button__icon lc-button__icon--left" aria-hidden="true">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                            </svg>
                        </span>
                    ) }
                    <RichText
                        tagName="span"
                        className="lc-button__label"
                        placeholder={ __( 'Button text…', 'limecuda' ) }
                        value={ text }
                        onChange={ ( val ) => setAttributes( { text: val } ) }
                        allowedFormats={ [] }
                    />
                    { showCaret && (
                        <span className="lc-button__icon lc-button__icon--right" aria-hidden="true">
                            <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M19.88 5.94L22 8.06L12 18.06L2 8.06L4.12 5.94L12 13.82L19.88 5.94Z" />
                            </svg>
                        </span>
                    ) }
                </a>
            </div>
		</>
	);
}
