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
    const { attributes, setAttributes, className } = props;
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
    } = attributes;

    // Derive current style from wrapper classes or attribute, fallback to 'primary'.
    const migrate = ( val ) => {
        if ( val === 'style-1' ) return 'primary';
        if ( val === 'style-2' ) return 'secondary';
        if ( val === 'style-3' ) return 'tertiary';
        if ( val === 'link' ) return 'outline';
        return val;
    };
    const classStyle = className?.match( /is-style-([\w-]+)/ )?.[ 1 ] || null;
    const currentStyle = migrate( classStyle || styleVariant || 'primary' );

    const blockProps = useBlockProps( {
        className: [
            'lc-button',
            `lc-button--${ size }`,
            currentStyle ? `lc-button--${ currentStyle }` : '',
            currentStyle === 'primary' && primaryColor ? `lc-button--primary-${ primaryColor }` : '',
            isOutline ? 'is-outline' : 'is-solid',
            isFullWidth ? 'is-full' : ''
        ].filter( Boolean ).join( ' ' ),
    } );

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
