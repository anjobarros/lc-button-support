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
		icon,
		iconPosition
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
		<div { ...blockProps }>
			<a href={ url || undefined } rel={ rel } target={ opensInNewTab ? '_blank' : undefined }>
				{ icon !== 'none' && iconPosition === 'left' && renderIcon( icon ) }
				<RichText.Content tagName="span" className="lc-button__label" value={ text } />
				{ icon !== 'none' && iconPosition === 'right' && renderIcon( icon ) }
			</a>
		</div>
	);
}
