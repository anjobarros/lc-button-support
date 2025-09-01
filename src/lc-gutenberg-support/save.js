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
		styleVariant
	} = attributes;

	const blockProps = useBlockProps.save( {
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
		<div { ...blockProps }>
			<RichText.Content
				tagName="a"
				value={ text }
				href={ url || undefined }
				rel={ rel }
				target={ opensInNewTab ? '_blank' : undefined }
			/>
		</div>
	);
}
