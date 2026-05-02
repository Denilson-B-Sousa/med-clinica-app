// src/types/react-form-wizard-component.d.ts

declare module "react-form-wizard-component" {
  import type { ReactNode, FC } from "react";

  type TabContentProps = {
    children?: ReactNode;
    title?: string;
    subtitle?: string;
    icon?: string | ReactNode;
  };

  type FormWizardProps = {
    children?: ReactNode;
    title?: string;
    subtitle?: string;
    color?: string;
    nextButtonText?: string;
    backButtonText?: string;
    finishButtonText?: string;
    onComplete?: () => void;
  };

  type FormWizardComponent = FC<FormWizardProps> & {
    TabContent: FC<TabContentProps>;
  };

  const FormWizard: FormWizardComponent;

  export default FormWizard;
}
