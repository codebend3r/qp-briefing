import { useCallback, useEffect, useState } from "react"

import Link from "next/link"

import styled from "@emotion/styled"
import { useSession } from "next-auth/react"

import { colors } from "@styles/colors"
import { theme } from "@styles/theme"

export const Section = styled.section`
  margin: 0 auto;
  max-width: 1140px;
  background-color: ${colors.slate[100]};
  padding: ${theme.spacing.lg};
  border-top: 4px solid ${colors.sky[500]};
  border-radius: ${theme.borderRadius.sm};
  box-shadow: ${theme.shadow.card};
  margin-bottom: ${theme.spacing.lg};

  @media (max-width: 768px) {
    padding: ${theme.spacing.sm};
  }
`

export const H2 = styled.h2`
  color: ${colors.blue[900]};
  margin-top: 0;
`

export const Message = styled.div`
  text-align: center;
  margin-top: ${theme.spacing.md};
`

export const MessageZone = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: ${theme.spacing.sm};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const ListItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 60px;
  grid-gap: ${theme.spacing.sm};
  background-color: #fff;
  padding: ${theme.spacing.sm} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  border-bottom: 2px solid ${colors.sky[500]};
`

export const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.sky[200]};
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
  }
`

export const Input = styled.input`
  &:checked + .slider {
    background-color: ${colors.sky[400]};
  }

  &:focus + .slider {
    box-shadow: 0 0 1px ${colors.sky[400]};
  }

  &:checked + .slider:before {
    transform: translateX(26px);
  }

  &:disabled + .slider {
    background-color: ${colors.slate[200]};
    cursor: not-allowed;
  }
`

export const SwitchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`

export const P = styled.p`
  font-size: 0.9em;
  color: ${colors.slate[500]};
  margin-top: 5px;
`

export const J = styled.div`
  padding: 0;
`

export const EmailPreferences = ({ paidUser }) => {
  const { data: session } = useSession()
  const [subscriptions, setSubscriptions] = useState([])
  const qpbMorningBrief = "d4f2b42e-272e-4981-ab9d-a8304277ceef"
  const qpbAfternoonBrief = `22ff26cd-c18e-49c7-9b1b-5ab1ae468c1d`
  const qpbBreaking = `39292256-bc4a-41bf-a35a-8bec4c32623a`
  const qpbWeekly = `0d121fd9-b6be-4cf9-aaf3-1acf61d4bfff`
  const [message, setMessage] = useState("")

  const handleUnsubscribe = useCallback(
    async (listId) => {
      const res = await fetch(`/api/email/?email=${encodeURIComponent(session.user.email)}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session.user.email,
          listId,
        }),
      })
      if (res.status === 200) {
        setSubscriptions(subscriptions.filter((sub) => sub !== listId))
        setMessage("You have been unsubscribed. Changes may take up to 24 hours to take affect.")
      } else {
        setMessage("There was an error unsubscribing you. Please try again later.")
      }
    },
    [subscriptions, session.user.email],
  )

  const handleSubscribe = async (listId) => {
    const res = await fetch(`/api/email/?email=${encodeURIComponent(session.user.email)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session.user.email,
        listId,
      }),
    })
    if (res.status === 200) {
      setSubscriptions([...subscriptions, listId])
      setMessage("You have been subscribed. Changes may take up to 24 hours to take affect.")
    } else {
      setMessage("There was an error subscribing you. Please try again later.")
    }
  }

  const unsubscribeAll = useCallback(async () => {
    Promise.all([
      handleUnsubscribe(qpbAfternoonBrief),
      handleUnsubscribe(qpbBreaking),
      handleUnsubscribe(qpbMorningBrief),
      handleUnsubscribe(qpbWeekly),
    ])
  }, [qpbAfternoonBrief, qpbBreaking, qpbMorningBrief, qpbWeekly, handleUnsubscribe])

  useEffect(() => {
    if (session && paidUser) {
      setMessage("")
      fetch(`/api/email/?email=${encodeURIComponent(session.user.email)}`)
        .then((res) => res.json())
        .then((data) => setSubscriptions(data))
        .catch((_err) => {
          // no-op
        })
    } else if (session && !paidUser && subscriptions.length > 0) {
      unsubscribeAll()
    }
  }, [session, paidUser, subscriptions, unsubscribeAll])

  if (!session) {
    return <div>loading...</div>
  }
  return (
    <Section>
      <H2>Email Preferences</H2>
      <ListContainer>
        <ListItem>
          <div className="content">
            <strong>Morning Briefing</strong>
            <P>A daily briefing on the day&apos;s upcoming events, delivered weekday mornings.</P>
          </div>
          <SwitchContainer>
            <Switch>
              <Input
                type="checkbox"
                disabled={!paidUser}
                checked={subscriptions.some((sub) => sub === qpbMorningBrief)}
                onChange={
                  subscriptions.some((sub) => sub === qpbMorningBrief)
                    ? () => handleUnsubscribe(qpbMorningBrief)
                    : () => handleSubscribe(qpbMorningBrief)
                }
              />
              <Slider></Slider>
            </Switch>
          </SwitchContainer>
        </ListItem>
        <ListItem>
          <div className="content">
            <strong>Afternoon Briefing</strong>
            <P>A daily recap of the day&apos;s published stories, delieved weekday afternoons.</P>
          </div>
          <SwitchContainer>
            <Switch>
              <Input
                type="checkbox"
                disabled={!paidUser}
                checked={subscriptions.some((sub) => sub === qpbAfternoonBrief)}
                onChange={
                  subscriptions.some((sub) => sub === qpbAfternoonBrief)
                    ? () => handleUnsubscribe(qpbAfternoonBrief)
                    : () => handleSubscribe(qpbAfternoonBrief)
                }
              />
              <Slider></Slider>
            </Switch>
          </SwitchContainer>
        </ListItem>
        <ListItem>
          <div className="content">
            <strong>Weekly Recap</strong>
            <P>A weekly summary of the news, delivered on Friday afternoon.</P>
          </div>
          <SwitchContainer>
            <Switch>
              <Input
                type="checkbox"
                disabled={!paidUser}
                checked={subscriptions.some((sub) => sub === qpbWeekly)}
                onChange={
                  subscriptions.some((sub) => sub === qpbWeekly)
                    ? () => handleUnsubscribe(qpbWeekly)
                    : () => handleSubscribe(qpbWeekly)
                }
              />
              <Slider></Slider>
            </Switch>
          </SwitchContainer>
        </ListItem>
        <ListItem>
          <div className="content">
            <strong>Breaking News Alerts</strong>
            <P>Breaking news stories delivered to your inbox as soon as they are published.</P>
          </div>
          <SwitchContainer>
            <Switch>
              <Input
                type="checkbox"
                disabled={!paidUser}
                checked={subscriptions.some((sub) => sub === qpbBreaking)}
                onChange={
                  subscriptions.some((sub) => sub === qpbBreaking)
                    ? () => handleUnsubscribe(qpbBreaking)
                    : () => handleSubscribe(qpbBreaking)
                }
              />
              <Slider></Slider>
            </Switch>
          </SwitchContainer>
        </ListItem>
      </ListContainer>
      {!!message && <Message>{message}</Message>}
      {!paidUser && (
        <MessageZone>
          <Message>You must have a subscription to manage your email preferences.</Message>
          <Link href="/offers/subscription">
            <button className="button">Subscribe Now</button>
          </Link>
        </MessageZone>
      )}
    </Section>
  )
}
