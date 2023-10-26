// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */

/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */

// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: dgFPhDvLY4vKuXTDNeS2uD
// Component: iJ9VAOwmK_pG

import * as React from 'react';

import * as p from '@plasmicapp/react-web';
import * as ph from '@plasmicapp/react-web/lib/host';

import {
  hasVariant,
  classNames,
  wrapWithClassName,
  createPlasmicElementProxy,
  makeFragment,
  MultiChoiceArg,
  SingleBooleanChoiceArg,
  SingleChoiceArg,
  pick,
  omit,
  useTrigger,
  StrictProps,
  deriveRenderOpts,
  ensureGlobalVariants,
} from '@plasmicapp/react-web';

import '@plasmicapp/react-web/lib/plasmic.css';

import plasmic_antd_5_hostless_css from '../antd_5_hostless/plasmic_antd_5_hostless.module.css'; // plasmic-import: ohDidvG9XsCeFumugENU3J/projectcss
import plasmic_plasmic_rich_components_css from '../plasmic_rich_components/plasmic_plasmic_rich_components.module.css'; // plasmic-import: jkU633o1Cz7HrJdwdxhVHk/projectcss
import projectcss from './plasmic_arturel.module.css'; // plasmic-import: dgFPhDvLY4vKuXTDNeS2uD/projectcss
import sty from './PlasmicGbrInfoBox.module.css'; // plasmic-import: iJ9VAOwmK_pG/css

createPlasmicElementProxy;

export type PlasmicGbrInfoBox__VariantMembers = {};
export type PlasmicGbrInfoBox__VariantsArgs = {};
type VariantPropType = keyof PlasmicGbrInfoBox__VariantsArgs;
export const PlasmicGbrInfoBox__VariantProps = new Array<VariantPropType>();

export type PlasmicGbrInfoBox__ArgsType = {};
type ArgPropType = keyof PlasmicGbrInfoBox__ArgsType;
export const PlasmicGbrInfoBox__ArgProps = new Array<ArgPropType>();

export type PlasmicGbrInfoBox__OverridesType = {
  root?: p.Flex<'div'>;
};

export interface DefaultGbrInfoBoxProps {
  className?: string;
}

const $$ = {};

function PlasmicGbrInfoBox__RenderFunc(props: {
  variants: PlasmicGbrInfoBox__VariantsArgs;
  args: PlasmicGbrInfoBox__ArgsType;
  overrides: PlasmicGbrInfoBox__OverridesType;
  forNode?: string;
}) {
  const { variants, overrides, forNode } = props;

  const args = React.useMemo(() => Object.assign({}, props.args), [props.args]);

  const $props = {
    ...args,
    ...variants,
  };

  const $ctx = ph.useDataEnv?.() || {};
  const refsRef = React.useRef({});
  const $refs = refsRef.current;

  const currentUser = p.useCurrentUser?.() || {};

  return (
    <div
      data-plasmic-name={'root'}
      data-plasmic-override={overrides.root}
      data-plasmic-root={true}
      data-plasmic-for-node={forNode}
      className={classNames(
        projectcss.all,
        projectcss.root_reset,
        projectcss.plasmic_default_styles,
        projectcss.plasmic_mixins,
        projectcss.plasmic_tokens,
        plasmic_antd_5_hostless_css.plasmic_tokens,
        plasmic_plasmic_rich_components_css.plasmic_tokens,
        sty.root
      )}
    />
  ) as React.ReactElement | null;
}

const PlasmicDescendants = {
  root: ['root'],
} as const;
type NodeNameType = keyof typeof PlasmicDescendants;
type DescendantsType<T extends NodeNameType> =
  (typeof PlasmicDescendants)[T][number];
type NodeDefaultElementType = {
  root: 'div';
};

type ReservedPropsType = 'variants' | 'args' | 'overrides';
type NodeOverridesType<T extends NodeNameType> = Pick<
  PlasmicGbrInfoBox__OverridesType,
  DescendantsType<T>
>;
type NodeComponentProps<T extends NodeNameType> =
  // Explicitly specify variants, args, and overrides as objects
  {
    variants?: PlasmicGbrInfoBox__VariantsArgs;
    args?: PlasmicGbrInfoBox__ArgsType;
    overrides?: NodeOverridesType<T>;
  } & Omit<PlasmicGbrInfoBox__VariantsArgs, ReservedPropsType> & // Specify variants directly as props
    /* Specify args directly as props*/ Omit<
      PlasmicGbrInfoBox__ArgsType,
      ReservedPropsType
    > &
    /* Specify overrides for each element directly as props*/ Omit<
      NodeOverridesType<T>,
      ReservedPropsType | VariantPropType | ArgPropType
    > &
    /* Specify props for the root element*/ Omit<
      Partial<React.ComponentProps<NodeDefaultElementType[T]>>,
      ReservedPropsType | VariantPropType | ArgPropType | DescendantsType<T>
    >;

function makeNodeComponent<NodeName extends NodeNameType>(nodeName: NodeName) {
  type PropsType = NodeComponentProps<NodeName> & { key?: React.Key };
  const func = function <T extends PropsType>(
    props: T & StrictProps<T, PropsType>
  ) {
    const { variants, args, overrides } = React.useMemo(
      () =>
        deriveRenderOpts(props, {
          name: nodeName,
          descendantNames: [...PlasmicDescendants[nodeName]],
          internalArgPropNames: PlasmicGbrInfoBox__ArgProps,
          internalVariantPropNames: PlasmicGbrInfoBox__VariantProps,
        }),
      [props, nodeName]
    );
    return PlasmicGbrInfoBox__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName,
    });
  };
  if (nodeName === 'root') {
    func.displayName = 'PlasmicGbrInfoBox';
  } else {
    func.displayName = `PlasmicGbrInfoBox.${nodeName}`;
  }
  return func;
}

export const PlasmicGbrInfoBox = Object.assign(
  // Top-level PlasmicGbrInfoBox renders the root element
  makeNodeComponent('root'),
  {
    // Helper components rendering sub-elements

    // Metadata about props expected for PlasmicGbrInfoBox
    internalVariantProps: PlasmicGbrInfoBox__VariantProps,
    internalArgProps: PlasmicGbrInfoBox__ArgProps,
  }
);

export default PlasmicGbrInfoBox;
/* prettier-ignore-end */
