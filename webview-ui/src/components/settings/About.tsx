import { HTMLAttributes } from "react"
import { useAppTranslation } from "@/i18n/TranslationContext"
import { Trans } from "react-i18next"
import {
	Info,
	Download,
	Upload,
	TriangleAlert,
	Globe,
	Shield,
	MessageCircle,
} from "lucide-react"
import { VSCodeCheckbox, VSCodeLink } from "@vscode/webview-ui-toolkit/react"

import type { TelemetrySetting } from "@echo-ai/types"

// Package bilgisi genelde process.env veya sabit bir dosyadan gelir
// Eğer @echo/package yoksa manuel sürüm yazabiliriz.


import { vscode } from "@/utils/vscode"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui"

import { SectionHeader } from "./SectionHeader"
import { Section } from "./Section"

type AboutProps = HTMLAttributes<HTMLDivElement> & {
	telemetrySetting: TelemetrySetting
	setTelemetrySetting: (setting: TelemetrySetting) => void
}

export const About = ({ telemetrySetting, setTelemetrySetting, className, ...props }: AboutProps) => {
	const { t } = useAppTranslation()

	return (
		<div className={cn("flex flex-col gap-2", className)} {...props}>
			<SectionHeader
				description={`Version: 1.0.2`}>
				<div className="flex items-center gap-2">
					<Info className="w-4" />
					<div>{t("settings:sections.about")}</div>
				</div>
			</SectionHeader>

			<Section>
				<div>
                    {/* Telemetriyi varsayılan olarak kapalı veya etkisiz gösteriyoruz */}
					<VSCodeCheckbox
						checked={telemetrySetting !== "disabled"}
						onChange={(e: any) => {
							const checked = e.target.checked === true
							setTelemetrySetting(checked ? "enabled" : "disabled")
						}}>
						{t("settings:footer.telemetry.label")}
					</VSCodeCheckbox>
					<p className="text-vscode-descriptionForeground text-sm mt-0">
                        {/* Gizlilik politikası linkini güncelledik */}
						<Trans
							i18nKey="settings:footer.telemetry.description"
							components={{
								privacyLink: <VSCodeLink href="https://devlog.tr" />,
							}}
						/>
					</p>
				</div>
			</Section>

			<Section className="space-y-0">
				<h3>{t("settings:about.contactAndCommunity")}</h3>
				<div className="flex flex-col gap-3">
					
                    {/* Web Sitesi Bağlantısı */}
                    <div className="flex items-start gap-2">
						<Globe className="size-4 text-vscode-descriptionForeground shrink-0" />
						<span>
							Website:{" "}
							<VSCodeLink href="https://devlog.tr">
								devlog.tr
							</VSCodeLink>
						</span>
					</div>

                    {/* E-posta Bağlantısı */}
					<div className="flex items-start gap-2">
						<MessageCircle className="size-4 text-vscode-descriptionForeground shrink-0" />
						<span>
							{t("settings:about.contact.label")}{" "}
							<VSCodeLink href="mailto:support@devlog.tr">support@devlog.tr</VSCodeLink>
						</span>
					</div>

                    {/* Güvenlik Bildirimi */}
                    <div className="flex items-start gap-2">
						<Shield className="size-4 text-vscode-descriptionForeground shrink-0" />
						<span>
							Security:{" "}
							<VSCodeLink href="mailto:security@devlog.tr">
								Report a vulnerability
							</VSCodeLink>
						</span>
					</div>

				</div>
			</Section>

			<Section className="space-y-0">
				<h3>{t("settings:about.manageSettings")}</h3>
				<div className="flex flex-wrap items-center gap-2">
					<Button onClick={() => vscode.postMessage({ type: "exportSettings" })} className="w-28">
						<Upload className="p-0.5" />
						{t("settings:footer.settings.export")}
					</Button>
					<Button onClick={() => vscode.postMessage({ type: "importSettings" })} className="w-28">
						<Download className="p-0.5" />
						{t("settings:footer.settings.import")}
					</Button>
					<Button
						variant="destructive"
						onClick={() => vscode.postMessage({ type: "resetState" })}
						className="w-28">
						<TriangleAlert className="p-0.5" />
						{t("settings:footer.settings.reset")}
					</Button>
				</div>
			</Section>
		</div>
	)
}
