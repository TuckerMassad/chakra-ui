import { useSafeLayoutEffect } from "@chakra-ui/hooks"
import Icon, { IconProps } from "@chakra-ui/icon"
import {
  chakra,
  forwardRef,
  useStyles,
  HTMLChakraProps,
  useMultiStyleConfig,
  ThemingProps,
  omitThemingProps,
  StylesProvider,
} from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { useFormControlContext } from "./form-control"

export interface FormErrorMessageProps
  extends HTMLChakraProps<"div">,
    ThemingProps {}

/**
 * Used to provide feedback about an invalid input,
 * and suggest clear instructions on how to fix it.
 */
export const FormErrorMessage = forwardRef<FormErrorMessageProps, "div">(
  (passedProps, ref) => {
    const styles = useMultiStyleConfig("FormError", passedProps)
    const props = omitThemingProps(passedProps)

    const field = useFormControlContext()

    /**
     * Notify the field context when the error message is rendered on screen,
     * so we can apply the correct `aria-describedby` to the field (e.g. input, textarea).
     */
    useSafeLayoutEffect(() => {
      field?.setHasFeedbackText.on()
      return () => field?.setHasFeedbackText.off()
    }, [])

    if (!field?.isInvalid) return null

    const _className = cx("chakra-form__error-message", props.className)

    return (
      <StylesProvider value={styles}>
        <chakra.div
          aria-live="polite"
          ref={ref}
          {...props}
          __css={{
            display: "flex",
            alignItems: "center",
            ...styles.text,
          }}
          className={_className}
          id={props.id ?? field?.feedbackId}
        />
      </StylesProvider>
    )
  },
)

if (__DEV__) {
  FormErrorMessage.displayName = "FormErrorMessage"
}

/**
 * Used as the visual indicator that a field is invalid or
 * a field has incorrect values.
 */
export const FormErrorIcon = forwardRef<IconProps, "svg">((props, ref) => {
  const styles = useStyles()
  const field = useFormControlContext()

  if (!field?.isInvalid) return null

  const _className = cx("chakra-form__error-icon", props.className)

  return (
    <Icon
      ref={ref}
      aria-hidden
      {...props}
      __css={styles.icon}
      className={_className}
    >
      <path
        fill="currentColor"
        d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
      />
    </Icon>
  )
})

if (__DEV__) {
  FormErrorIcon.displayName = "FormErrorIcon"
}
