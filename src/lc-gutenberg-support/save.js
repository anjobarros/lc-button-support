import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
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
        isDisabled,
        iconName,
        iconPosition
    } = attributes;

    // Normalize styleVariant to the supported set.
    const normalizeVariant = (val) => {
        if ( val === 'primary' ) return 'primary';
        if ( val === 'secondary' ) return 'secondary';
        if ( val === 'information' ) return 'information';
        if ( val === 'outline' ) return 'outline';
        // Legacy mappings from prior style names
        if ( val === 'style-1' ) return 'primary';
        if ( val === 'style-2' ) return 'secondary';
        if ( val === 'style-3' ) return 'information';
        if ( val === 'link' ) return 'outline';
        if ( val === 'tertiary' ) return 'information';
        return val;
    };
    const variant = normalizeVariant( styleVariant );

    const blockProps = useBlockProps.save( {
        className: [
            'lc-button',
            `lc-button--${ size }`,
            variant ? `lc-button--${ variant }` : '',
            variant === 'primary' && primaryColor ? `lc-button--primary-${ primaryColor }` : '',
            // icon classes added after we compute slug below
            // Remove legacy state flags; rely on lc-button--outline etc.
            isFullWidth ? 'is-full' : ''
        ].filter( Boolean ).join( ' ' ),
    } );

	const rel = [
		opensInNewTab ? 'noopener' : null,
		relNoFollow ? 'nofollow' : null,
		relSponsored ? 'sponsored' : null
	].filter( Boolean ).join( ' ' ) || undefined;

    const iconSlug = ( iconName || '' ).replace( /^dashicons-/, '' );
    const hasIcon = !!iconSlug;
    // Rebuild className to include icon classes if present
    if ( hasIcon ) {
        blockProps.className += ` has-icon has-icon-${ iconPosition || 'right' } has-icon-${ iconSlug }`;
    }

    return (
        <div { ...blockProps }>
            <a
                href={ isDisabled ? undefined : ( url || undefined ) }
                rel={ rel }
                target={ isDisabled ? undefined : ( opensInNewTab ? '_blank' : undefined ) }
                aria-disabled={ isDisabled ? 'true' : undefined }
                tabIndex={ isDisabled ? -1 : undefined }
            >
                { ( hasIcon && ( iconPosition || 'right' ) === 'left' ) && (
                    <span className={ `dashicons dashicons-${ iconSlug }` } aria-hidden="true" />
                ) }
                { ( typeof textPlain === 'string' && textPlain !== '' ) ? textPlain : text }
                { ( hasIcon && ( iconPosition || 'right' ) === 'right' ) && (
                    <span className={ `dashicons dashicons-${ iconSlug }` } aria-hidden="true" />
                ) }
            </a>
        </div>
    );
}
