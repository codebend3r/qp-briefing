export const getSubscription = async (id) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscriptions/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const subscription = await data.json()
  return subscription
}
