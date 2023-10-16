// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */

/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */

// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: dgFPhDvLY4vKuXTDNeS2uD
// Component: 1n2yq6wOjOZQ

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
import projectcss from './plasmic_arturel.module.css'; // plasmic-import: dgFPhDvLY4vKuXTDNeS2uD/projectcss
import sty from './PlasmicGbrCoordinateViewItem.module.css'; // plasmic-import: 1n2yq6wOjOZQ/css

createPlasmicElementProxy;

export type PlasmicGbrCoordinateViewItem__VariantMembers = {};
export type PlasmicGbrCoordinateViewItem__VariantsArgs = {};
type VariantPropType = keyof PlasmicGbrCoordinateViewItem__VariantsArgs;
export const PlasmicGbrCoordinateViewItem__VariantProps =
  new Array<VariantPropType>();

export type PlasmicGbrCoordinateViewItem__ArgsType = {
  x?: number;
  y?: number;
  id?: string;
};
type ArgPropType = keyof PlasmicGbrCoordinateViewItem__ArgsType;
export const PlasmicGbrCoordinateViewItem__ArgProps = new Array<ArgPropType>(
  'x',
  'y',
  'id'
);

export type PlasmicGbrCoordinateViewItem__OverridesType = {
  root?: p.Flex<'div'>;
  xLabel?: p.Flex<'div'>;
  idv?: p.Flex<'div'>;
  yLabel?: p.Flex<'div'>;
  y?: p.Flex<'div'>;
  yLabel2?: p.Flex<'div'>;
  x2?: p.Flex<'div'>;
};

export interface DefaultGbrCoordinateViewItemProps {
  x?: number;
  y?: number;
  id?: string;
  className?: string;
}

const $$ = {};

function PlasmicGbrCoordinateViewItem__RenderFunc(props: {
  variants: PlasmicGbrCoordinateViewItem__VariantsArgs;
  args: PlasmicGbrCoordinateViewItem__ArgsType;
  overrides: PlasmicGbrCoordinateViewItem__OverridesType;
  forNode?: string;
}) {
  const { variants, overrides, forNode } = props;

  const args = React.useMemo(
    () =>
      Object.assign(
        {
          x: 0,
          y: 0,
          id: '0',
        },
        props.args
      ),
    [props.args]
  );

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
        sty.root
      )}
    >
      <div
        data-plasmic-name={'xLabel'}
        data-plasmic-override={overrides.xLabel}
        className={classNames(
          projectcss.all,
          projectcss.__wab_text,
          sty.xLabel
        )}
      >
        {'ID:'}
      </div>
      <div
        data-plasmic-name={'idv'}
        data-plasmic-override={overrides.idv}
        className={classNames(projectcss.all, projectcss.__wab_text, sty.idv)}
      >
        <React.Fragment>
          {(() => {
            try {
              return $props.id;
            } catch (e) {
              if (
                e instanceof TypeError ||
                e?.plasmicType === 'PlasmicUndefinedDataError'
              ) {
                return 'start';
              }
              throw e;
            }
          })()}
        </React.Fragment>
      </div>
      <div
        data-plasmic-name={'yLabel'}
        data-plasmic-override={overrides.yLabel}
        className={classNames(
          projectcss.all,
          projectcss.__wab_text,
          sty.yLabel
        )}
      >
        {'x:'}
      </div>
      <div
        data-plasmic-name={'y'}
        data-plasmic-override={overrides.y}
        className={classNames(projectcss.all, projectcss.__wab_text, sty.y)}
      >
        <React.Fragment>
          {(() => {
            try {
              return $props.x;
            } catch (e) {
              if (
                e instanceof TypeError ||
                e?.plasmicType === 'PlasmicUndefinedDataError'
              ) {
                return 'start';
              }
              throw e;
            }
          })()}
        </React.Fragment>
      </div>
      <div
        data-plasmic-name={'yLabel2'}
        data-plasmic-override={overrides.yLabel2}
        className={classNames(
          projectcss.all,
          projectcss.__wab_text,
          sty.yLabel2
        )}
      >
        {'y:'}
      </div>
      <div
        data-plasmic-name={'x2'}
        data-plasmic-override={overrides.x2}
        className={classNames(projectcss.all, projectcss.__wab_text, sty.x2)}
      >
        <React.Fragment>
          {(() => {
            try {
              return $props.y;
            } catch (e) {
              if (
                e instanceof TypeError ||
                e?.plasmicType === 'PlasmicUndefinedDataError'
              ) {
                return 'start';
              }
              throw e;
            }
          })()}
        </React.Fragment>
      </div>
    </div>
  ) as React.ReactElement | null;
}

const PlasmicDescendants = {
  root: ['root', 'xLabel', 'idv', 'yLabel', 'y', 'yLabel2', 'x2'],
  xLabel: ['xLabel'],
  idv: ['idv'],
  yLabel: ['yLabel'],
  y: ['y'],
  yLabel2: ['yLabel2'],
  x2: ['x2'],
} as const;
type NodeNameType = keyof typeof PlasmicDescendants;
type DescendantsType<T extends NodeNameType> =
  (typeof PlasmicDescendants)[T][number];
type NodeDefaultElementType = {
  root: 'div';
  xLabel: 'div';
  idv: 'div';
  yLabel: 'div';
  y: 'div';
  yLabel2: 'div';
  x2: 'div';
};

type ReservedPropsType = 'variants' | 'args' | 'overrides';
type NodeOverridesType<T extends NodeNameType> = Pick<
  PlasmicGbrCoordinateViewItem__OverridesType,
  DescendantsType<T>
>;
type NodeComponentProps<T extends NodeNameType> =
  // Explicitly specify variants, args, and overrides as objects
  {
    variants?: PlasmicGbrCoordinateViewItem__VariantsArgs;
    args?: PlasmicGbrCoordinateViewItem__ArgsType;
    overrides?: NodeOverridesType<T>;
  } & Omit<PlasmicGbrCoordinateViewItem__VariantsArgs, ReservedPropsType> & // Specify variants directly as props
    /* Specify args directly as props*/ Omit<
      PlasmicGbrCoordinateViewItem__ArgsType,
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
          internalArgPropNames: PlasmicGbrCoordinateViewItem__ArgProps,
          internalVariantPropNames: PlasmicGbrCoordinateViewItem__VariantProps,
        }),
      [props, nodeName]
    );
    return PlasmicGbrCoordinateViewItem__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName,
    });
  };
  if (nodeName === 'root') {
    func.displayName = 'PlasmicGbrCoordinateViewItem';
  } else {
    func.displayName = `PlasmicGbrCoordinateViewItem.${nodeName}`;
  }
  return func;
}

export const PlasmicGbrCoordinateViewItem = Object.assign(
  // Top-level PlasmicGbrCoordinateViewItem renders the root element
  makeNodeComponent('root'),
  {
    // Helper components rendering sub-elements
    xLabel: makeNodeComponent('xLabel'),
    idv: makeNodeComponent('idv'),
    yLabel: makeNodeComponent('yLabel'),
    y: makeNodeComponent('y'),
    yLabel2: makeNodeComponent('yLabel2'),
    x2: makeNodeComponent('x2'),

    // Metadata about props expected for PlasmicGbrCoordinateViewItem
    internalVariantProps: PlasmicGbrCoordinateViewItem__VariantProps,
    internalArgProps: PlasmicGbrCoordinateViewItem__ArgProps,
  }
);

export default PlasmicGbrCoordinateViewItem;
/* prettier-ignore-end */