import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
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
        isDisabled,
        showInfoIcon,
        showCaret
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
            // Remove legacy state flags; rely on lc-button--outline etc.
            isFullWidth ? 'is-full' : ''
        ].filter( Boolean ).join( ' ' ),
    } );

	const rel = [
		opensInNewTab ? 'noopener' : null,
		relNoFollow ? 'nofollow' : null,
		relSponsored ? 'sponsored' : null
	].filter( Boolean ).join( ' ' ) || undefined;

    return (
        <div { ...blockProps }>
            <a
                href={ isDisabled ? undefined : ( url || undefined ) }
                rel={ rel }
                target={ isDisabled ? undefined : ( opensInNewTab ? '_blank' : undefined ) }
                aria-disabled={ isDisabled ? 'true' : undefined }
                tabIndex={ isDisabled ? -1 : undefined }
            >
                { showInfoIcon && (
                    <span className="lc-button__icon lc-button__icon--left" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                        </svg>
                    </span>
                ) }
                <RichText.Content tagName="span" className="lc-button__label" value={ text } />
                { showCaret && (
                    <span className="lc-button__icon lc-button__icon--right" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.88 5.94L22 8.06L12 18.06L2 8.06L4.12 5.94L12 13.82L19.88 5.94Z" />
                        </svg>
                    </span>
                ) }
            </a>
        </div>
    );
}
