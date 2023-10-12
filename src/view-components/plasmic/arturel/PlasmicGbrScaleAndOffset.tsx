// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */

/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */

// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: dgFPhDvLY4vKuXTDNeS2uD
// Component: htrT0eM9VhMx

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
import { AntdInput } from '@plasmicpkgs/antd5/skinny/registerInput'; // plasmic-import: Vf5hntD2SZ5/codeComponent
import { inputHelpers as AntdInput_Helpers } from '@plasmicpkgs/antd5/skinny/registerInput'; // plasmic-import: Vf5hntD2SZ5/codeComponentHelper
import { AntdButton } from '@plasmicpkgs/antd5/skinny/registerButton'; // plasmic-import: bx9Xzvf5_eu/codeComponent

import '@plasmicapp/react-web/lib/plasmic.css';

import plasmic_antd_5_hostless_css from '../antd_5_hostless/plasmic_antd_5_hostless.module.css'; // plasmic-import: ohDidvG9XsCeFumugENU3J/projectcss
import projectcss from './plasmic_arturel.module.css'; // plasmic-import: dgFPhDvLY4vKuXTDNeS2uD/projectcss
import sty from './PlasmicGbrScaleAndOffset.module.css'; // plasmic-import: htrT0eM9VhMx/css

createPlasmicElementProxy;

export type PlasmicGbrScaleAndOffset__VariantMembers = {};
export type PlasmicGbrScaleAndOffset__VariantsArgs = {};
type VariantPropType = keyof PlasmicGbrScaleAndOffset__VariantsArgs;
export const PlasmicGbrScaleAndOffset__VariantProps =
  new Array<VariantPropType>();

export type PlasmicGbrScaleAndOffset__ArgsType = {
  scaleAndOffset?: (
    width: number,
    height: number,
    x: number,
    y: number
  ) => void;
};
type ArgPropType = keyof PlasmicGbrScaleAndOffset__ArgsType;
export const PlasmicGbrScaleAndOffset__ArgProps = new Array<ArgPropType>(
  'scaleAndOffset'
);

export type PlasmicGbrScaleAndOffset__OverridesType = {
  root?: p.Flex<'div'>;
  width?: p.Flex<typeof AntdInput>;
  height?: p.Flex<typeof AntdInput>;
  x?: p.Flex<typeof AntdInput>;
  y?: p.Flex<typeof AntdInput>;
  button?: p.Flex<typeof AntdButton>;
};

export interface DefaultGbrScaleAndOffsetProps {
  scaleAndOffset?: (
    width: number,
    height: number,
    x: number,
    y: number
  ) => void;
  className?: string;
}

const $$ = {};

function PlasmicGbrScaleAndOffset__RenderFunc(props: {
  variants: PlasmicGbrScaleAndOffset__VariantsArgs;
  args: PlasmicGbrScaleAndOffset__ArgsType;
  overrides: PlasmicGbrScaleAndOffset__OverridesType;
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
        path: 'width.value',
        type: 'private',
        variableType: 'text',
        initFunc: ({ $props, $state, $queries, $ctx }) => ``,

        onMutate: p.generateOnMutateForSpec('value', AntdInput_Helpers),
      },
      {
        path: 'height.value',
        type: 'private',
        variableType: 'text',
        initFunc: ({ $props, $state, $queries, $ctx }) => ``,

        onMutate: p.generateOnMutateForSpec('value', AntdInput_Helpers),
      },
      {
        path: 'x.value',
        type: 'private',
        variableType: 'text',
        initFunc: ({ $props, $state, $queries, $ctx }) => '0',

        onMutate: p.generateOnMutateForSpec('value', AntdInput_Helpers),
      },
      {
        path: 'y.value',
        type: 'private',
        variableType: 'text',
        initFunc: ({ $props, $state, $queries, $ctx }) => '0',

        onMutate: p.generateOnMutateForSpec('value', AntdInput_Helpers),
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
        sty.root
      )}
    >
      <div className={classNames(projectcss.all, sty.freeBox___03Tbu)}>
        <div
          className={classNames(
            projectcss.all,
            projectcss.__wab_text,
            sty.text__xpAtk
          )}
        >
          {'Master Width'}
        </div>
        {(() => {
          const child$Props = {
            className: classNames('__wab_instance', sty.width),
            onChange: p.generateStateOnChangePropForCodeComponents(
              $state,
              'value',
              ['width', 'value'],
              AntdInput_Helpers
            ),
            placeholder: 'mm * 10',
            type: 'number',
            value: p.generateStateValueProp($state, ['width', 'value']),
          };
          p.initializeCodeComponentStates(
            $state,
            [
              {
                name: 'value',
                plasmicStateName: 'width.value',
              },
            ],
            [],
            AntdInput_Helpers ?? {},
            child$Props
          );

          return (
            <AntdInput
              data-plasmic-name={'width'}
              data-plasmic-override={overrides.width}
              {...child$Props}
            />
          );
        })()}
        <div
          className={classNames(
            projectcss.all,
            projectcss.__wab_text,
            sty.text___3G6Q4
          )}
        >
          {'mm * 10^'}
        </div>
      </div>
      <div className={classNames(projectcss.all, sty.freeBox__h2EBb)}>
        <div
          className={classNames(
            projectcss.all,
            projectcss.__wab_text,
            sty.text__tnC4K
          )}
        >
          {'Master Height'}
        </div>
        {(() => {
          const child$Props = {
            className: classNames('__wab_instance', sty.height),
            onChange: p.generateStateOnChangePropForCodeComponents(
              $state,
              'value',
              ['height', 'value'],
              AntdInput_Helpers
            ),
            placeholder: 'mm * 10',
            type: 'number',
            value: p.generateStateValueProp($state, ['height', 'value']),
          };
          p.initializeCodeComponentStates(
            $state,
            [
              {
                name: 'value',
                plasmicStateName: 'height.value',
              },
            ],
            [],
            AntdInput_Helpers ?? {},
            child$Props
          );

          return (
            <AntdInput
              data-plasmic-name={'height'}
              data-plasmic-override={overrides.height}
              {...child$Props}
            />
          );
        })()}
        <div
          className={classNames(
            projectcss.all,
            projectcss.__wab_text,
            sty.text__gicY2
          )}
        >
          {'mm * 10^'}
        </div>
      </div>
      <div className={classNames(projectcss.all, sty.freeBox__xdHz7)}>
        <div
          className={classNames(
            projectcss.all,
            projectcss.__wab_text,
            sty.text__p0Llq
          )}
        >
          {'Offset X'}
        </div>
        {(() => {
          const child$Props = {
            className: classNames('__wab_instance', sty.x),
            onChange: p.generateStateOnChangePropForCodeComponents(
              $state,
              'value',
              ['x', 'value'],
              AntdInput_Helpers
            ),
            placeholder: ``,
            type: 'number',
            value: p.generateStateValueProp($state, ['x', 'value']),
          };
          p.initializeCodeComponentStates(
            $state,
            [
              {
                name: 'value',
                plasmicStateName: 'x.value',
              },
            ],
            [],
            AntdInput_Helpers ?? {},
            child$Props
          );

          return (
            <AntdInput
              data-plasmic-name={'x'}
              data-plasmic-override={overrides.x}
              {...child$Props}
            />
          );
        })()}
        <div
          className={classNames(
            projectcss.all,
            projectcss.__wab_text,
            sty.text__wT2Be
          )}
        >
          {'mm * 10^'}
        </div>
      </div>
      <div className={classNames(projectcss.all, sty.freeBox__rjs5M)}>
        <div
          className={classNames(
            projectcss.all,
            projectcss.__wab_text,
            sty.text__axUw2
          )}
        >
          {'Offset Y'}
        </div>
        {(() => {
          const child$Props = {
            className: classNames('__wab_instance', sty.y),
            onChange: p.generateStateOnChangePropForCodeComponents(
              $state,
              'value',
              ['y', 'value'],
              AntdInput_Helpers
            ),
            placeholder: ``,
            type: 'number',
            value: p.generateStateValueProp($state, ['y', 'value']),
          };
          p.initializeCodeComponentStates(
            $state,
            [
              {
                name: 'value',
                plasmicStateName: 'y.value',
              },
            ],
            [],
            AntdInput_Helpers ?? {},
            child$Props
          );

          return (
            <AntdInput
              data-plasmic-name={'y'}
              data-plasmic-override={overrides.y}
              {...child$Props}
            />
          );
        })()}
        <div
          className={classNames(
            projectcss.all,
            projectcss.__wab_text,
            sty.text__hq59J
          )}
        >
          {'mm * 10^'}
        </div>
      </div>
      <div className={classNames(projectcss.all, sty.freeBox__tEqQ)}>
        <AntdButton
          data-plasmic-name={'button'}
          data-plasmic-override={overrides.button}
          className={classNames('__wab_instance', sty.button)}
          onClick={async () => {
            const $steps = {};

            $steps['runScaleAndOffset'] = true
              ? (() => {
                  const actionArgs = {
                    eventRef: $props['scaleAndOffset'],
                    args: [
                      (() => {
                        try {
                          return $state.width.value;
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
                          return $state.height.value;
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
                          return $state.x.value;
                        } catch (e) {
                          if (
                            e instanceof TypeError ||
                            e?.plasmicType === 'PlasmicUndefinedDataError'
                          ) {
                            return 1;
                          }
                          throw e;
                        }
                      })(),
                      (() => {
                        try {
                          return $state.y.value;
                        } catch (e) {
                          if (
                            e instanceof TypeError ||
                            e?.plasmicType === 'PlasmicUndefinedDataError'
                          ) {
                            return 1;
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
              typeof $steps['runScaleAndOffset'] === 'object' &&
              typeof $steps['runScaleAndOffset'].then === 'function'
            ) {
              $steps['runScaleAndOffset'] = await $steps['runScaleAndOffset'];
            }
          }}
        >
          <div
            className={classNames(
              projectcss.all,
              projectcss.__wab_text,
              sty.text__xMaGo
            )}
          >
            {'Apply'}
          </div>
        </AntdButton>
      </div>
    </div>
  ) as React.ReactElement | null;
}

const PlasmicDescendants = {
  root: ['root', 'width', 'height', 'x', 'y', 'button'],
  width: ['width'],
  height: ['height'],
  x: ['x'],
  y: ['y'],
  button: ['button'],
} as const;
type NodeNameType = keyof typeof PlasmicDescendants;
type DescendantsType<T extends NodeNameType> =
  (typeof PlasmicDescendants)[T][number];
type NodeDefaultElementType = {
  root: 'div';
  width: typeof AntdInput;
  height: typeof AntdInput;
  x: typeof AntdInput;
  y: typeof AntdInput;
  button: typeof AntdButton;
};

type ReservedPropsType = 'variants' | 'args' | 'overrides';
type NodeOverridesType<T extends NodeNameType> = Pick<
  PlasmicGbrScaleAndOffset__OverridesType,
  DescendantsType<T>
>;
type NodeComponentProps<T extends NodeNameType> =
  // Explicitly specify variants, args, and overrides as objects
  {
    variants?: PlasmicGbrScaleAndOffset__VariantsArgs;
    args?: PlasmicGbrScaleAndOffset__ArgsType;
    overrides?: NodeOverridesType<T>;
  } & Omit<PlasmicGbrScaleAndOffset__VariantsArgs, ReservedPropsType> & // Specify variants directly as props
    /* Specify args directly as props*/ Omit<
      PlasmicGbrScaleAndOffset__ArgsType,
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
          internalArgPropNames: PlasmicGbrScaleAndOffset__ArgProps,
          internalVariantPropNames: PlasmicGbrScaleAndOffset__VariantProps,
        }),
      [props, nodeName]
    );
    return PlasmicGbrScaleAndOffset__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName,
    });
  };
  if (nodeName === 'root') {
    func.displayName = 'PlasmicGbrScaleAndOffset';
  } else {
    func.displayName = `PlasmicGbrScaleAndOffset.${nodeName}`;
  }
  return func;
}

export const PlasmicGbrScaleAndOffset = Object.assign(
  // Top-level PlasmicGbrScaleAndOffset renders the root element
  makeNodeComponent('root'),
  {
    // Helper components rendering sub-elements
    width: makeNodeComponent('width'),
    height: makeNodeComponent('height'),
    x: makeNodeComponent('x'),
    y: makeNodeComponent('y'),
    button: makeNodeComponent('button'),

    // Metadata about props expected for PlasmicGbrScaleAndOffset
    internalVariantProps: PlasmicGbrScaleAndOffset__VariantProps,
    internalArgProps: PlasmicGbrScaleAndOffset__ArgProps,
  }
);

export default PlasmicGbrScaleAndOffset;
/* prettier-ignore-end */