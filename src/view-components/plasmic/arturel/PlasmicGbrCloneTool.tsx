// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */

/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */

// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: dgFPhDvLY4vKuXTDNeS2uD
// Component: 05mOR9eSl0_B

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
import { AntdInputNumber } from '@plasmicpkgs/antd5/skinny/registerInput'; // plasmic-import: wxD5qjEe3pU/codeComponent
import { AntdButton } from '@plasmicpkgs/antd5/skinny/registerButton'; // plasmic-import: bx9Xzvf5_eu/codeComponent

import '@plasmicapp/react-web/lib/plasmic.css';

import plasmic_antd_5_hostless_css from '../antd_5_hostless/plasmic_antd_5_hostless.module.css'; // plasmic-import: ohDidvG9XsCeFumugENU3J/projectcss
import plasmic_plasmic_rich_components_css from '../plasmic_rich_components/plasmic_plasmic_rich_components.module.css'; // plasmic-import: jkU633o1Cz7HrJdwdxhVHk/projectcss
import projectcss from './plasmic_arturel.module.css'; // plasmic-import: dgFPhDvLY4vKuXTDNeS2uD/projectcss
import sty from './PlasmicGbrCloneTool.module.css'; // plasmic-import: 05mOR9eSl0_B/css

createPlasmicElementProxy;

export type PlasmicGbrCloneTool__VariantMembers = {};
export type PlasmicGbrCloneTool__VariantsArgs = {};
type VariantPropType = keyof PlasmicGbrCloneTool__VariantsArgs;
export const PlasmicGbrCloneTool__VariantProps = new Array<VariantPropType>();

export type PlasmicGbrCloneTool__ArgsType = {
  clone?: () => void;
  clear?: () => void;
  onChange?: (cx: number, cy: number, px: number, py: number) => void;
  nClone?: (cx: number, cy: number, px: number, py: number) => void;
};
type ArgPropType = keyof PlasmicGbrCloneTool__ArgsType;
export const PlasmicGbrCloneTool__ArgProps = new Array<ArgPropType>(
  'clone',
  'clear',
  'onChange',
  'nClone'
);

export type PlasmicGbrCloneTool__OverridesType = {
  root?: p.Flex<'div'>;
  cx?: p.Flex<typeof AntdInputNumber>;
  cy?: p.Flex<typeof AntdInputNumber>;
  px?: p.Flex<typeof AntdInputNumber>;
  py?: p.Flex<typeof AntdInputNumber>;
  clone?: p.Flex<typeof AntdButton>;
  clear?: p.Flex<typeof AntdButton>;
};

export interface DefaultGbrCloneToolProps {
  clone?: () => void;
  clear?: () => void;
  onChange?: (cx: number, cy: number, px: number, py: number) => void;
  nClone?: (cx: number, cy: number, px: number, py: number) => void;
  className?: string;
}

const $$ = {};

function PlasmicGbrCloneTool__RenderFunc(props: {
  variants: PlasmicGbrCloneTool__VariantsArgs;
  args: PlasmicGbrCloneTool__ArgsType;
  overrides: PlasmicGbrCloneTool__OverridesType;
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

  const stateSpecs: Parameters<typeof p.useDollarState>[0] = React.useMemo(
    () => [
      {
        path: 'cx.value',
        type: 'private',
        variableType: 'text',
        initFunc: ({ $props, $state, $queries, $ctx }) => 3,
      },
      {
        path: 'cy.value',
        type: 'private',
        variableType: 'text',
        initFunc: ({ $props, $state, $queries, $ctx }) => 2,
      },
      {
        path: 'px.value',
        type: 'private',
        variableType: 'text',
        initFunc: ({ $props, $state, $queries, $ctx }) => 0,
      },
      {
        path: 'py.value',
        type: 'private',
        variableType: 'text',
        initFunc: ({ $props, $state, $queries, $ctx }) => 0,
      },
    ],
    [$props, $ctx, $refs]
  );
  const $state = p.useDollarState(stateSpecs, {
    $props,
    $ctx,
    $queries: {},
    $refs,
  });

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
      <div className={classNames(projectcss.all, sty.freeBox__wFnX)}>
        <div
          className={classNames(
            projectcss.all,
            projectcss.__wab_text,
            sty.text__pnvuF
          )}
        >
          {'Clone X'}
        </div>
        <AntdInputNumber
          data-plasmic-name={'cx'}
          data-plasmic-override={overrides.cx}
          className={classNames('__wab_instance', sty.cx)}
          min={1}
          onChange={p.generateStateOnChangeProp($state, ['cx', 'value'])}
          onPressEnter={async (event) => {
            const $steps = {};

            $steps['updateCxValue'] = true
              ? (() => {
                  const actionArgs = {
                    variable: {
                      objRoot: $state,
                      variablePath: ['cx', 'value'],
                    },
                    operation: 0,
                  };
                  return (({ variable, value, startIndex, deleteCount }) => {
                    if (!variable) {
                      return;
                    }
                    const { objRoot, variablePath } = variable;

                    p.set(objRoot, variablePath, value);
                    return value;
                  })?.apply(null, [actionArgs]);
                })()
              : undefined;
            if (
              $steps['updateCxValue'] != null &&
              typeof $steps['updateCxValue'] === 'object' &&
              typeof $steps['updateCxValue'].then === 'function'
            ) {
              $steps['updateCxValue'] = await $steps['updateCxValue'];
            }
          }}
          placeholder={'0'}
          value={p.generateStateValueProp($state, ['cx', 'value'])}
        />
      </div>
      <div className={classNames(projectcss.all, sty.freeBox___3LFKi)}>
        <div
          className={classNames(
            projectcss.all,
            projectcss.__wab_text,
            sty.text___4JykU
          )}
        >
          {'Clone Y'}
        </div>
        <AntdInputNumber
          data-plasmic-name={'cy'}
          data-plasmic-override={overrides.cy}
          className={classNames('__wab_instance', sty.cy)}
          min={1}
          onChange={p.generateStateOnChangeProp($state, ['cy', 'value'])}
          onPressEnter={async (event) => {
            const $steps = {};
          }}
          placeholder={``}
          value={p.generateStateValueProp($state, ['cy', 'value'])}
        />
      </div>
      <div className={classNames(projectcss.all, sty.freeBox__lluiV)}>
        <div
          className={classNames(
            projectcss.all,
            projectcss.__wab_text,
            sty.text__z7Ylp
          )}
        >
          {'Spacing X'}
        </div>
        <AntdInputNumber
          data-plasmic-name={'px'}
          data-plasmic-override={overrides.px}
          className={classNames('__wab_instance', sty.px)}
          min={0}
          onChange={p.generateStateOnChangeProp($state, ['px', 'value'])}
          onPressEnter={async (event) => {
            const $steps = {};
          }}
          placeholder={``}
          value={p.generateStateValueProp($state, ['px', 'value'])}
        />
      </div>
      <div className={classNames(projectcss.all, sty.freeBox__rks1)}>
        <div
          className={classNames(
            projectcss.all,
            projectcss.__wab_text,
            sty.text__icvBt
          )}
        >
          {'Spacing Y'}
        </div>
        <AntdInputNumber
          data-plasmic-name={'py'}
          data-plasmic-override={overrides.py}
          className={classNames('__wab_instance', sty.py)}
          min={0}
          onChange={p.generateStateOnChangeProp($state, ['py', 'value'])}
          onPressEnter={async (event) => {
            const $steps = {};
          }}
          placeholder={``}
          value={p.generateStateValueProp($state, ['py', 'value'])}
        />
      </div>
      <div className={classNames(projectcss.all, sty.freeBox__sjJ9J)}>
        <AntdButton
          data-plasmic-name={'clone'}
          data-plasmic-override={overrides.clone}
          className={classNames('__wab_instance', sty.clone)}
          onClick={async () => {
            const $steps = {};

            $steps['runNClone'] = true
              ? (() => {
                  const actionArgs = {
                    eventRef: $props['nClone'],
                    args: [
                      (() => {
                        try {
                          return $state.cx.value;
                        } catch (e) {
                          if (
                            e instanceof TypeError ||
                            e?.plasmicType === 'PlasmicUndefinedDataError'
                          ) {
                            return undefined;
                          }
                          throw e;
                        }
                      })(),
                      (() => {
                        try {
                          return $state.cy.value;
                        } catch (e) {
                          if (
                            e instanceof TypeError ||
                            e?.plasmicType === 'PlasmicUndefinedDataError'
                          ) {
                            return undefined;
                          }
                          throw e;
                        }
                      })(),
                      (() => {
                        try {
                          return $state.px.value;
                        } catch (e) {
                          if (
                            e instanceof TypeError ||
                            e?.plasmicType === 'PlasmicUndefinedDataError'
                          ) {
                            return undefined;
                          }
                          throw e;
                        }
                      })(),
                      (() => {
                        try {
                          return $state.py.value;
                        } catch (e) {
                          if (
                            e instanceof TypeError ||
                            e?.plasmicType === 'PlasmicUndefinedDataError'
                          ) {
                            return undefined;
                          }
                          throw e;
                        }
                      })(),
                    ],
                  };
                  return (({ eventRef, args }) => {
                    return eventRef?.(...(args ?? []));
                  })?.apply(null, [actionArgs]);
                })()
              : undefined;
            if (
              $steps['runNClone'] != null &&
              typeof $steps['runNClone'] === 'object' &&
              typeof $steps['runNClone'].then === 'function'
            ) {
              $steps['runNClone'] = await $steps['runNClone'];
            }
          }}
        >
          <div
            className={classNames(
              projectcss.all,
              projectcss.__wab_text,
              sty.text___7L33Y
            )}
          >
            {'Clone'}
          </div>
        </AntdButton>
        <AntdButton
          data-plasmic-name={'clear'}
          data-plasmic-override={overrides.clear}
          className={classNames('__wab_instance', sty.clear)}
          onClick={async () => {
            const $steps = {};

            $steps['runClear'] = true
              ? (() => {
                  const actionArgs = { eventRef: $props['clear'] };
                  return (({ eventRef, args }) => {
                    return eventRef?.(...(args ?? []));
                  })?.apply(null, [actionArgs]);
                })()
              : undefined;
            if (
              $steps['runClear'] != null &&
              typeof $steps['runClear'] === 'object' &&
              typeof $steps['runClear'].then === 'function'
            ) {
              $steps['runClear'] = await $steps['runClear'];
            }
          }}
        >
          <div
            className={classNames(
              projectcss.all,
              projectcss.__wab_text,
              sty.text__u60VG
            )}
          >
            {'Clear'}
          </div>
        </AntdButton>
      </div>
    </div>
  ) as React.ReactElement | null;
}

const PlasmicDescendants = {
  root: ['root', 'cx', 'cy', 'px', 'py', 'clone', 'clear'],
  cx: ['cx'],
  cy: ['cy'],
  px: ['px'],
  py: ['py'],
  clone: ['clone'],
  clear: ['clear'],
} as const;
type NodeNameType = keyof typeof PlasmicDescendants;
type DescendantsType<T extends NodeNameType> =
  (typeof PlasmicDescendants)[T][number];
type NodeDefaultElementType = {
  root: 'div';
  cx: typeof AntdInputNumber;
  cy: typeof AntdInputNumber;
  px: typeof AntdInputNumber;
  py: typeof AntdInputNumber;
  clone: typeof AntdButton;
  clear: typeof AntdButton;
};

type ReservedPropsType = 'variants' | 'args' | 'overrides';
type NodeOverridesType<T extends NodeNameType> = Pick<
  PlasmicGbrCloneTool__OverridesType,
  DescendantsType<T>
>;
type NodeComponentProps<T extends NodeNameType> =
  // Explicitly specify variants, args, and overrides as objects
  {
    variants?: PlasmicGbrCloneTool__VariantsArgs;
    args?: PlasmicGbrCloneTool__ArgsType;
    overrides?: NodeOverridesType<T>;
  } & Omit<PlasmicGbrCloneTool__VariantsArgs, ReservedPropsType> & // Specify variants directly as props
    /* Specify args directly as props*/ Omit<
      PlasmicGbrCloneTool__ArgsType,
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
          internalArgPropNames: PlasmicGbrCloneTool__ArgProps,
          internalVariantPropNames: PlasmicGbrCloneTool__VariantProps,
        }),
      [props, nodeName]
    );
    return PlasmicGbrCloneTool__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName,
    });
  };
  if (nodeName === 'root') {
    func.displayName = 'PlasmicGbrCloneTool';
  } else {
    func.displayName = `PlasmicGbrCloneTool.${nodeName}`;
  }
  return func;
}

export const PlasmicGbrCloneTool = Object.assign(
  // Top-level PlasmicGbrCloneTool renders the root element
  makeNodeComponent('root'),
  {
    // Helper components rendering sub-elements
    cx: makeNodeComponent('cx'),
    cy: makeNodeComponent('cy'),
    px: makeNodeComponent('px'),
    py: makeNodeComponent('py'),
    clone: makeNodeComponent('clone'),
    clear: makeNodeComponent('clear'),

    // Metadata about props expected for PlasmicGbrCloneTool
    internalVariantProps: PlasmicGbrCloneTool__VariantProps,
    internalArgProps: PlasmicGbrCloneTool__ArgProps,
  }
);

export default PlasmicGbrCloneTool;
/* prettier-ignore-end */
