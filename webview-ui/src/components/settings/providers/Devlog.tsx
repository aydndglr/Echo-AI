import { VSCodeTextField } from "@vscode/webview-ui-toolkit/react"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { type ProviderSettings } from "@echo-ai/types"

interface DevLogProps {
    apiConfiguration: ProviderSettings
    setApiConfigurationField: (field: keyof ProviderSettings, value: ProviderSettings[keyof ProviderSettings]) => void
    // Diğer parametreler artık kullanılmadığı için silebilir veya böyle bırakabilirsin
    routerModels?: any
    organizationAllowList?: any
    modelValidationError?: any
}

export const DevLog = ({
    apiConfiguration,
    setApiConfigurationField,
}: DevLogProps) => {
    useTranslation()
    const [apiKey, setApiKey] = useState((apiConfiguration as any).devlogApiKey || "")

    useEffect(() => {
        setApiKey((apiConfiguration as any).devlogApiKey || "")
    }, [apiConfiguration])

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
                <label className="block font-medium mb-1">API Key / Token</label>
                <VSCodeTextField
                    value={apiKey}
                    onInput={(e: any) => {
                        setApiKey(e.target.value)
                        setApiConfigurationField("devlogApiKey" as any, e.target.value)
                    }}
                    placeholder="DLG-XXXX-XXXX"
                    type="password"
                    className="w-full"
                />
                <p className="text-xs text-vscode-descriptionForeground">
                    Panelden aldığınız erişim anahtarı.
                </p>
            </div>
            
            {/* ModelPicker buradan silindi. Artık genel ayarlar sayfasından otomatik gelecek. */}
        </div>
    )
}