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

	const blockProps = useBlockProps.save( {
        className: [
            'lc-button',
            `lc-button--${ size }`,
            styleVariant ? `lc-button--${ styleVariant }` : '',
            styleVariant === 'primary' && primaryColor ? `lc-button--primary-${ primaryColor }` : '',
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
