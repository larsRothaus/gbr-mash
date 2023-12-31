// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */

/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */

// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: dgFPhDvLY4vKuXTDNeS2uD
// Component: 2FrFNBw3REdi

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
import plasmic_plasmic_rich_components_css from '../plasmic_rich_components/plasmic_plasmic_rich_components.module.css'; // plasmic-import: jkU633o1Cz7HrJdwdxhVHk/projectcss
import projectcss from './plasmic_arturel.module.css'; // plasmic-import: dgFPhDvLY4vKuXTDNeS2uD/projectcss
import sty from './PlasmicTestTool.module.css'; // plasmic-import: 2FrFNBw3REdi/css

createPlasmicElementProxy;

export type PlasmicTestTool__VariantMembers = {};
export type PlasmicTestTool__VariantsArgs = {};
type VariantPropType = keyof PlasmicTestTool__VariantsArgs;
export const PlasmicTestTool__VariantProps = new Array<VariantPropType>();

export type PlasmicTestTool__ArgsType = {
  doStuff?: (value: string) => void;
};
type ArgPropType = keyof PlasmicTestTool__ArgsType;
export const PlasmicTestTool__ArgProps = new Array<ArgPropType>('doStuff');

export type PlasmicTestTool__OverridesType = {
  root?: p.Flex<'div'>;
  freeBox?: p.Flex<'div'>;
  input?: p.Flex<typeof AntdInput>;
  button?: p.Flex<typeof AntdButton>;
};

export interface DefaultTestToolProps {
  doStuff?: (value: string) => void;
  className?: string;
}

const $$ = {};

function PlasmicTestTool__RenderFunc(props: {
  variants: PlasmicTestTool__VariantsArgs;
  args: PlasmicTestTool__ArgsType;
  overrides: PlasmicTestTool__OverridesType;
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
        path: 'input.value',
        type: 'private',
        variableType: 'text',
        initFunc: ({ $props, $state, $queries, $ctx }) => undefined,

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
        plasmic_plasmic_rich_components_css.plasmic_tokens,
        sty.root
      )}
    >
      <div
        data-plasmic-name={'freeBox'}
        data-plasmic-override={overrides.freeBox}
        className={classNames(projectcss.all, sty.freeBox)}
      >
        <div
          className={classNames(
            projectcss.all,
            projectcss.__wab_text,
            sty.text__sKgu6
          )}
        >
          {'Add some shit'}
        </div>
        {(() => {
          const child$Props = {
            className: classNames('__wab_instance', sty.input),
            onChange: p.generateStateOnChangePropForCodeComponents(
              $state,
              'value',
              ['input', 'value'],
              AntdInput_Helpers
            ),
            value: p.generateStateValueProp($state, ['input', 'value']),
          };
          p.initializeCodeComponentStates(
            $state,
            [
              {
                name: 'value',
                plasmicStateName: 'input.value',
              },
            ],
            [],
            AntdInput_Helpers ?? {},
            child$Props
          );

          return (
            <AntdInput
              data-plasmic-name={'input'}
              data-plasmic-override={overrides.input}
              {...child$Props}
            />
          );
        })()}
      </div>
      <AntdButton
        data-plasmic-name={'button'}
        data-plasmic-override={overrides.button}
        className={classNames('__wab_instance', sty.button)}
        disabled={(() => {
          try {
            return !$state.input.value;
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
        onClick={async () => {
          const $steps = {};

          $steps['runDoStuff'] = true
            ? (() => {
                const actionArgs = {
                  eventRef: $props['doStuff'],
                  args: [
                    (() => {
                      try {
                        return $state.input.value;
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
            $steps['runDoStuff'] != null &&
            typeof $steps['runDoStuff'] === 'object' &&
            typeof $steps['runDoStuff'].then === 'function'
          ) {
            $steps['runDoStuff'] = await $steps['runDoStuff'];
          }
        }}
      >
        <div
          className={classNames(
            projectcss.all,
            projectcss.__wab_text,
            sty.text__xrfvS
          )}
        >
          {'Button'}
        </div>
      </AntdButton>
    </div>
  ) as React.ReactElement | null;
}

const PlasmicDescendants = {
  root: ['root', 'freeBox', 'input', 'button'],
  freeBox: ['freeBox', 'input'],
  input: ['input'],
  button: ['button'],
} as const;
type NodeNameType = keyof typeof PlasmicDescendants;
type DescendantsType<T extends NodeNameType> =
  (typeof PlasmicDescendants)[T][number];
type NodeDefaultElementType = {
  root: 'div';
  freeBox: 'div';
  input: typeof AntdInput;
  button: typeof AntdButton;
};

type ReservedPropsType = 'variants' | 'args' | 'overrides';
type NodeOverridesType<T extends NodeNameType> = Pick<
  PlasmicTestTool__OverridesType,
  DescendantsType<T>
>;
type NodeComponentProps<T extends NodeNameType> =
  // Explicitly specify variants, args, and overrides as objects
  {
    variants?: PlasmicTestTool__VariantsArgs;
    args?: PlasmicTestTool__ArgsType;
    overrides?: NodeOverridesType<T>;
  } & Omit<PlasmicTestTool__VariantsArgs, ReservedPropsType> & // Specify variants directly as props
    /* Specify args directly as props*/ Omit<
      PlasmicTestTool__ArgsType,
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
          internalArgPropNames: PlasmicTestTool__ArgProps,
          internalVariantPropNames: PlasmicTestTool__VariantProps,
        }),
      [props, nodeName]
    );
    return PlasmicTestTool__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName,
    });
  };
  if (nodeName === 'root') {
    func.displayName = 'PlasmicTestTool';
  } else {
    func.displayName = `PlasmicTestTool.${nodeName}`;
  }
  return func;
}

export const PlasmicTestTool = Object.assign(
  // Top-level PlasmicTestTool renders the root element
  makeNodeComponent('root'),
  {
    // Helper components rendering sub-elements
    freeBox: makeNodeComponent('freeBox'),
    input: makeNodeComponent('input'),
    button: makeNodeComponent('button'),

    // Metadata about props expected for PlasmicTestTool
    internalVariantProps: PlasmicTestTool__VariantProps,
    internalArgProps: PlasmicTestTool__ArgProps,
  }
);

export default PlasmicTestTool;
/* prettier-ignore-end */
