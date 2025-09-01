<?php
// This file is generated. Do not modify it manually.
return array(
	'lc-gutenberg-support' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'limecuda/button',
		'version' => '1.0.0',
		'title' => 'LC Button',
		'category' => 'design',
		'icon' => 'button',
		'description' => 'An opinionated LimeCuda button block with locked styling and style presets.',
		'keywords' => array(
			'button',
			'cta',
			'link'
		),
		'supports' => array(
			'html' => false,
			'align' => array(
				'wide',
				'full'
			),
			'className' => true,
			'customClassName' => true,
			'typography' => false,
			'spacing' => false,
			'color' => array(
				'background' => false,
				'text' => false,
				'gradients' => false,
				'link' => false
			),
			'shadow' => false,
			'border' => false
		),
		'attributes' => array(
			'text' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => 'a',
				'default' => 'Click Me'
			),
			'url' => array(
				'type' => 'string',
				'default' => ''
			),
			'opensInNewTab' => array(
				'type' => 'boolean',
				'default' => false
			),
			'relNoFollow' => array(
				'type' => 'boolean',
				'default' => false
			),
			'relSponsored' => array(
				'type' => 'boolean',
				'default' => false
			),
			'styleVariant' => array(
				'type' => 'string',
				'default' => 'primary'
			),
			'isFullWidth' => array(
				'type' => 'boolean',
				'default' => false
			),
			'isOutline' => array(
				'type' => 'boolean',
				'default' => false
			),
			'size' => array(
				'type' => 'string',
				'default' => 'md'
			),
			'isDisabled' => array(
				'type' => 'boolean',
				'default' => false
			),
			'primaryColor' => array(
				'type' => 'string',
				'default' => 'red'
			)
		),
		'styles' => array(
			array(
				'name' => 'primary',
				'label' => 'Primary',
				'isDefault' => true
			),
			array(
				'name' => 'secondary',
				'label' => 'Secondary'
			),
			array(
				'name' => 'outline',
				'label' => 'Outline'
			),
			array(
				'name' => 'information',
				'label' => 'Information'
			)
		),
		'example' => array(
			'attributes' => array(
				'text' => 'Get Started',
				'styleVariant' => 'style-2'
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	)
);
