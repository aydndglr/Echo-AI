import { type ProviderSettings, type OrganizationAllowList, echoDefaultModelId as echoDefaultModelId } from "@echo-ai/types"

import type { RouterModels } from "@echo/api"

import { useAppTranslation } from "@src/i18n/TranslationContext"
import { vscode } from "@src/utils/vscode"
import { Button } from "@src/components/ui"

import { ModelPicker } from "../ModelPicker"

type EchoProps = {
	apiConfiguration: ProviderSettings
	setApiConfigurationField: (field: keyof ProviderSettings, value: ProviderSettings[keyof ProviderSettings]) => void
	routerModels?: RouterModels
	cloudIsAuthenticated: boolean
	organizationAllowList: OrganizationAllowList
	modelValidationError?: string
}

export const Echo = ({
	apiConfiguration,
	setApiConfigurationField,
	routerModels,
	cloudIsAuthenticated,
	organizationAllowList,
	modelValidationError,
}: EchoProps) => {
	const { t } = useAppTranslation()

	return (
		<>
			{cloudIsAuthenticated ? (
				<div className="flex justify-between items-center mb-2">
					<div className="text-sm text-vscode-descriptionForeground">
						{t("settings:providers.roo.authenticatedMessage")}
					</div>
				</div>
			) : (
				<div className="flex flex-col gap-2">
					<Button
						variant="primary"
						onClick={() => vscode.postMessage({ type: "devlogCloudSignIn" })}
						className="w-fit">
						{t("settings:providers.roo.connectButton")}
					</Button>
				</div>
			)}
			<ModelPicker
				apiConfiguration={apiConfiguration}
				setApiConfigurationField={setApiConfigurationField}
				defaultModelId={echoDefaultModelId}
				models={routerModels?.echo ?? {}}
				modelIdKey="apiModelId"
				serviceName="DevLOG Market"
				serviceUrl="https://devlog.tr"
				organizationAllowList={organizationAllowList}
				errorMessage={modelValidationError}
			/>
		</>
	)
}
