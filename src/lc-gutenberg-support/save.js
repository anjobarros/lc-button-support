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
        isDisabled
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
			<RichText.Content
				tagName="a"
				value={ text }
				href={ isDisabled ? undefined : ( url || undefined ) }
				rel={ rel }
				target={ isDisabled ? undefined : ( opensInNewTab ? '_blank' : undefined ) }
				aria-disabled={ isDisabled ? 'true' : undefined }
				tabIndex={ isDisabled ? -1 : undefined }
			/>
		</div>
	);
}
