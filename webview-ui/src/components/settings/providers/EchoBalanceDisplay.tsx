import { VSCodeLink } from "@vscode/webview-ui-toolkit/react"

import { useEchoCreditBalance } from "@/components/ui/hooks/useDevlogCreditBalance"
import { useExtensionState } from "@src/context/ExtensionStateContext"

export const RooBalanceDisplay = () => {
	const { data: balance } = useEchoCreditBalance()
	const { cloudApiUrl } = useExtensionState()

	if (balance === null || balance === undefined) {
		return null
	}

	const formattedBalance = balance.toFixed(2)
	const billingUrl = cloudApiUrl ? `${cloudApiUrl.replace(/\/$/, "")}/billing` : "https://app.devlog.tr/billing"

	return (
		<VSCodeLink href={billingUrl} className="text-vscode-foreground hover:underline whitespace-nowrap">
			${formattedBalance}
		</VSCodeLink>
	)
}
