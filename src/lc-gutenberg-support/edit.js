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

    const blockProps = useBlockProps( {
        className: [
            'lc-button',
            `lc-button--${ size }`,
            styleVariant ? `lc-button--${ styleVariant }` : '',
            styleVariant === 'primary' && primaryColor ? `lc-button--primary-${ primaryColor }` : '',
            isOutline ? 'is-outline' : 'is-solid',
            isFullWidth ? 'is-full' : ''
        ].filter( Boolean ).join( ' ' ),
    } );

    // Keep our `styleVariant` in sync with the Styles panel.
    // Detect from the computed wrapper classes (which include is-style-*).
    useEffect( () => {
        const m = blockProps?.className?.match( /is-style-([\w-]+)/ );
        const raw = m?.[ 1 ];
        const migrate = ( val ) => {
            if ( val === 'style-1' ) return 'primary';
            if ( val === 'style-2' ) return 'secondary';
            if ( val === 'style-3' ) return 'tertiary';
            if ( val === 'link' ) return 'outline';
            return val;
        };
        const next = raw ? migrate( raw ) : 'primary';
        if ( next && next !== styleVariant ) {
            setAttributes( { styleVariant: next } );
        }
    }, [ blockProps?.className ] );

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

                    { /* Additional basic settings above */ }

                    
                    

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

                { styleVariant === 'primary' && (
                    <PanelBody title={ __( 'Primary Options', 'limecuda' ) } initialOpen={ false }>
                        <SelectControl
                            label={ __( 'Color', 'limecuda' ) }
                            value={ primaryColor }
                            options={ [
                                { label: __( 'Red', 'limecuda' ), value: 'red' },
                                { label: __( 'Blue', 'limecuda' ), value: 'blue' },
                            ] }
                            onChange={ ( val ) => setAttributes( { primaryColor: val } ) }
                        />
                    </PanelBody>
                ) }

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
