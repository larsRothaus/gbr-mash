// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */

/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */

// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: dgFPhDvLY4vKuXTDNeS2uD
// Component: di9u-oXGa0_E

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
import GbrCoordinateViewItem from '../../GbrCoordinateViewItem'; // plasmic-import: 1n2yq6wOjOZQ/component

import '@plasmicapp/react-web/lib/plasmic.css';

import plasmic_antd_5_hostless_css from '../antd_5_hostless/plasmic_antd_5_hostless.module.css'; // plasmic-import: ohDidvG9XsCeFumugENU3J/projectcss
import plasmic_plasmic_rich_components_css from '../plasmic_rich_components/plasmic_plasmic_rich_components.module.css'; // plasmic-import: jkU633o1Cz7HrJdwdxhVHk/projectcss
import projectcss from './plasmic_arturel.module.css'; // plasmic-import: dgFPhDvLY4vKuXTDNeS2uD/projectcss
import sty from './PlasmicGbrCoordinateView.module.css'; // plasmic-import: di9u-oXGa0_E/css

createPlasmicElementProxy;

export type PlasmicGbrCoordinateView__VariantMembers = {};
export type PlasmicGbrCoordinateView__VariantsArgs = {};
type VariantPropType = keyof PlasmicGbrCoordinateView__VariantsArgs;
export const PlasmicGbrCoordinateView__VariantProps =
  new Array<VariantPropType>();

export type PlasmicGbrCoordinateView__ArgsType = {
  gbrNode?: any;
};
type ArgPropType = keyof PlasmicGbrCoordinateView__ArgsType;
export const PlasmicGbrCoordinateView__ArgProps = new Array<ArgPropType>(
  'gbrNode'
);

export type PlasmicGbrCoordinateView__OverridesType = {
  root?: p.Flex<'div'>;
  label?: p.Flex<'div'>;
  value?: p.Flex<'div'>;
  label2?: p.Flex<'div'>;
  value2?: p.Flex<'div'>;
  label3?: p.Flex<'div'>;
  value3?: p.Flex<'div'>;
  gbrCoordinateViewItem?: p.Flex<typeof GbrCoordinateViewItem>;
};

export interface DefaultGbrCoordinateViewProps {
  gbrNode?: any;
  className?: string;
}

const $$ = {};

function PlasmicGbrCoordinateView__RenderFunc(props: {
  variants: PlasmicGbrCoordinateView__VariantsArgs;
  args: PlasmicGbrCoordinateView__ArgsType;
  overrides: PlasmicGbrCoordinateView__OverridesType;
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
    >
      <div className={classNames(projectcss.all, sty.freeBox__ezvgE)}>
        <div
          data-plasmic-name={'label'}
          data-plasmic-override={overrides.label}
          className={classNames(
            projectcss.all,
            projectcss.__wab_text,
            sty.label
          )}
        >
          {'Node-id:'}
        </div>
        <div
          data-plasmic-name={'value'}
          data-plasmic-override={overrides.value}
          className={classNames(
            projectcss.all,
            projectcss.__wab_text,
            sty.value
          )}
        >
          <React.Fragment>
            {(() => {
              try {
                return $props.gbrNode.refId;
              } catch (e) {
                if (
                  e instanceof TypeError ||
                  e?.plasmicType === 'PlasmicUndefinedDataError'
                ) {
                  return 'unknown';
                }
                throw e;
              }
            })()}
          </React.Fragment>
        </div>
      </div>
      <div className={classNames(projectcss.all, sty.freeBox__od7Li)}>
        <div
          data-plasmic-name={'label2'}
          data-plasmic-override={overrides.label2}
          className={classNames(
            projectcss.all,
            projectcss.__wab_text,
            sty.label2
          )}
        >
          {'Start:'}
        </div>
        <div
          data-plasmic-name={'value2'}
          data-plasmic-override={overrides.value2}
          className={classNames(
            projectcss.all,
            projectcss.__wab_text,
            sty.value2
          )}
        >
          <React.Fragment>
            {(() => {
              try {
                return JSON.stringify($props.gbrNode.startEndVectors.start);
              } catch (e) {
                if (
                  e instanceof TypeError ||
                  e?.plasmicType === 'PlasmicUndefinedDataError'
                ) {
                  return 'unknown';
                }
                throw e;
              }
            })()}
          </React.Fragment>
        </div>
      </div>
      <div className={classNames(projectcss.all, sty.freeBox__vbOgD)}>
        <div
          data-plasmic-name={'label3'}
          data-plasmic-override={overrides.label3}
          className={classNames(
            projectcss.all,
            projectcss.__wab_text,
            sty.label3
          )}
        >
          {'End:'}
        </div>
        <div
          data-plasmic-name={'value3'}
          data-plasmic-override={overrides.value3}
          className={classNames(
            projectcss.all,
            projectcss.__wab_text,
            sty.value3
          )}
        >
          <React.Fragment>
            {(() => {
              try {
                return JSON.stringify($props.gbrNode.startEndVectors.end);
              } catch (e) {
                if (
                  e instanceof TypeError ||
                  e?.plasmicType === 'PlasmicUndefinedDataError'
                ) {
                  return 'unknown';
                }
                throw e;
              }
            })()}
          </React.Fragment>
        </div>
      </div>
      <div className={classNames(projectcss.all, sty.freeBox__heiw6)}>
        {((_par) => (!_par ? [] : Array.isArray(_par) ? _par : [_par]))(
          (() => {
            try {
              return $props.gbrNode.points;
            } catch (e) {
              if (
                e instanceof TypeError ||
                e?.plasmicType === 'PlasmicUndefinedDataError'
              ) {
                return [];
              }
              throw e;
            }
          })()
        ).map((__plasmic_item_0, __plasmic_idx_0) => {
          const currentItem = __plasmic_item_0;
          const currentIndex = __plasmic_idx_0;
          return (
            <GbrCoordinateViewItem
              data-plasmic-name={'gbrCoordinateViewItem'}
              data-plasmic-override={overrides.gbrCoordinateViewItem}
              className={classNames(
                '__wab_instance',
                sty.gbrCoordinateViewItem
              )}
              id={(() => {
                try {
                  return currentIndex;
                } catch (e) {
                  if (
                    e instanceof TypeError ||
                    e?.plasmicType === 'PlasmicUndefinedDataError'
                  ) {
                    return undefined;
                  }
                  throw e;
                }
              })()}
              key={currentIndex}
              x={(() => {
                try {
                  return currentItem.x;
                } catch (e) {
                  if (
                    e instanceof TypeError ||
                    e?.plasmicType === 'PlasmicUndefinedDataError'
                  ) {
                    return undefined;
                  }
                  throw e;
                }
              })()}
              y={(() => {
                try {
                  return currentItem.y;
                } catch (e) {
                  if (
                    e instanceof TypeError ||
                    e?.plasmicType === 'PlasmicUndefinedDataError'
                  ) {
                    return undefined;
                  }
                  throw e;
                }
              })()}
            />
          );
        })}
      </div>
    </div>
  ) as React.ReactElement | null;
}

const PlasmicDescendants = {
  root: [
    'root',
    'label',
    'value',
    'label2',
    'value2',
    'label3',
    'value3',
    'gbrCoordinateViewItem',
  ],
  label: ['label'],
  value: ['value'],
  label2: ['label2'],
  value2: ['value2'],
  label3: ['label3'],
  value3: ['value3'],
  gbrCoordinateViewItem: ['gbrCoordinateViewItem'],
} as const;
type NodeNameType = keyof typeof PlasmicDescendants;
type DescendantsType<T extends NodeNameType> =
  (typeof PlasmicDescendants)[T][number];
type NodeDefaultElementType = {
  root: 'div';
  label: 'div';
  value: 'div';
  label2: 'div';
  value2: 'div';
  label3: 'div';
  value3: 'div';
  gbrCoordinateViewItem: typeof GbrCoordinateViewItem;
};

type ReservedPropsType = 'variants' | 'args' | 'overrides';
type NodeOverridesType<T extends NodeNameType> = Pick<
  PlasmicGbrCoordinateView__OverridesType,
  DescendantsType<T>
>;
type NodeComponentProps<T extends NodeNameType> =
  // Explicitly specify variants, args, and overrides as objects
  {
    variants?: PlasmicGbrCoordinateView__VariantsArgs;
    args?: PlasmicGbrCoordinateView__ArgsType;
    overrides?: NodeOverridesType<T>;
  } & Omit<PlasmicGbrCoordinateView__VariantsArgs, ReservedPropsType> & // Specify variants directly as props
    /* Specify args directly as props*/ Omit<
      PlasmicGbrCoordinateView__ArgsType,
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
          internalArgPropNames: PlasmicGbrCoordinateView__ArgProps,
          internalVariantPropNames: PlasmicGbrCoordinateView__VariantProps,
        }),
      [props, nodeName]
    );
    return PlasmicGbrCoordinateView__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName,
    });
  };
  if (nodeName === 'root') {
    func.displayName = 'PlasmicGbrCoordinateView';
  } else {
    func.displayName = `PlasmicGbrCoordinateView.${nodeName}`;
  }
  return func;
}

export const PlasmicGbrCoordinateView = Object.assign(
  // Top-level PlasmicGbrCoordinateView renders the root element
  makeNodeComponent('root'),
  {
    // Helper components rendering sub-elements
    label: makeNodeComponent('label'),
    value: makeNodeComponent('value'),
    label2: makeNodeComponent('label2'),
    value2: makeNodeComponent('value2'),
    label3: makeNodeComponent('label3'),
    value3: makeNodeComponent('value3'),
    gbrCoordinateViewItem: makeNodeComponent('gbrCoordinateViewItem'),

    // Metadata about props expected for PlasmicGbrCoordinateView
    internalVariantProps: PlasmicGbrCoordinateView__VariantProps,
    internalArgProps: PlasmicGbrCoordinateView__ArgProps,
  }
);

export default PlasmicGbrCoordinateView;
/* prettier-ignore-end */
