import { __ } from '@wordpress/i18n';
import { Button, Popover, TextControl } from '@wordpress/components';
import { useMemo, useRef, useState } from '@wordpress/element';
import { ICONS } from './icons';

export default function IconPicker( { value, onChange } ) {
  const anchorRef = useRef();
  const [ open, setOpen ] = useState( false );
  const [ query, setQuery ] = useState( '' );

  const filtered = useMemo( () => {
    const q = query.trim().toLowerCase();
    if ( ! q ) return ICONS;
    return ICONS.filter( ( ic ) =>
      ic.name.includes( q ) || ic.label.toLowerCase().includes( q ) || ( ic.keywords || [] ).some( k => k.includes( q ) )
    );
  }, [ query ] );

  const current = ICONS.find( (i) => i.name === value );

  return (
    <div className="lc-icon-picker">
      <div className="lc-icon-picker__row">
        <Button
          ref={ anchorRef }
          variant="secondary"
          onClick={ () => setOpen( (v) => ! v ) }
        >
          { current ? `${ __( 'Icon', 'limecuda' ) }: ${ current.label }` : __( 'Choose Icon', 'limecuda' ) }
        </Button>
        { value && value !== 'none' && (
          <Button variant="link" onClick={ () => onChange( 'none' ) }>{ __( 'Clear', 'limecuda' ) }</Button>
        ) }
      </div>

      { open && (
        <Popover anchor={ anchorRef.current } onClose={ () => setOpen( false ) } placement="bottom-start" className="lc-icon-picker__popover">
          <div className="lc-icon-picker__content">
            <TextControl
              placeholder={ __( 'Search icons…', 'limecuda' ) }
              value={ query }
              onChange={ setQuery }
            />
            <div className="lc-icon-picker__grid">
              <Button key="none" className={`lc-icon-picker__item ${ value === 'none' ? 'is-active' : '' }`} onClick={ () => { onChange( 'none' ); setOpen( false ); } }>
                { __( 'None', 'limecuda' ) }
              </Button>
              { filtered.map( ( ic ) => (
                <Button key={ ic.name } className={`lc-icon-picker__item ${ value === ic.name ? 'is-active' : '' }`} onClick={ () => { onChange( ic.name ); setOpen( false ); } } aria-label={ ic.label }>
                  { ic.svg() }
                </Button>
              ) ) }
            </div>
          </div>
        </Popover>
      ) }
    </div>
  );
}

