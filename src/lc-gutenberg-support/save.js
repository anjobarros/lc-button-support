import { useBlockProps, RichText } from '@wordpress/block-editor';
import { renderIcon } from './icons';

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
