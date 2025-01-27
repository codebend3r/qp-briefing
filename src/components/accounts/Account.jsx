import { useMemo } from "react"

import { EmailPreferences } from "@components/accounts/EmailPreferences"
import { Subscription } from "@components/accounts/Subscription"
import styling from "@components/accounts/account.module.scss"

export const Account = ({ session = null, subscriptions = [] }) => {
  const isPaidUser = useMemo(
    () => subscriptions?.some((s) => s.status === "active" || s.status === "trialing") ?? false,
    [subscriptions],
  )

  return (
    <div className={styling.container}>
      <h1 className={styling.title}>Account</h1>
      <p>{session?.user?.email ?? "no email"}</p>
      <EmailPreferences paidUser={isPaidUser} />
      {!!subscriptions?.length ? (
        subscriptions.map((sub) => <Subscription data={sub} key={sub.id} session={session} />)
      ) : (
        <p>No subscriptions</p>
      )}
    </div>
  )
}
