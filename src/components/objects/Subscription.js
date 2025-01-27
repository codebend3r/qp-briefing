import Image from "next/image"
import Link from "next/link"

import { urlFor } from "@lib/sanity/sanity"

import { colors } from "@styles/colors"
import { theme } from "@styles/theme"

import Card from "./Card"

export const Subscription = ({ title, backgroundColor, benefits, button, price, subtitle, textColor, checkImage }) => {
  return (
    <Card backgroundColor={backgroundColor.color}>
      <div className="subscription">
        <h3>{title}</h3>
        {price ? (
          <div className="price">
            <span className="currency">$</span>
            <span className="amount">{price}</span>
            <span className="period">/mo</span>
          </div>
        ) : null}

        <p>{subtitle}</p>

        <Link href={button.link} passHref>
          <button>{button.text}</button>
        </Link>
        <div className="benefits">
          {benefits.map((benefit, index) => {
            return (
              <div className="benefit" key={index}>
                {checkImage ? (
                  <span className="checkmark">
                    <Image src={urlFor(checkImage).url()} width={20} height={20} alt="" />
                  </span>
                ) : null}

                <span className="text">{benefit}</span>
              </div>
            )
          })}
        </div>
      </div>
      <style jsx>{`
        .subscription {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: ${textColor};
          width: fit-content;
          max-width: 375px;
        }
        .subscription h3 {
          font-size: 1.8rem;
          color: ${colors.blue[900]};
          font-weight: 800;
          margin: 0 0 ${theme.spacing.sm} 0;
          text-align: center;
        }
        .subscription p {
          font-size: 1rem;
          font-weight: 400;
          margin: 0;
          color: ${colors.grey[500]};
          text-align: center;
        }
        .price {
          font-size: 2.5rem;
          font-weight: 600;
          margin: 0;
          display: flex;
          align-items: center;
          margin: 0;
        }
        .currency {
          font-size: 1.5rem;
          font-weight: 600;
          margin-right: 0.5rem;
        }
        .period {
          font-size: 1rem;
          font-weight: 600;
          margin-left: 0.5rem;
        }
        .benefits {
          margin-top: 2rem;
          margin-right: auto;
        }
        .benefit {
          display: flex;
          align-items: center;
          margin-bottom: 0.5rem;
          margin-bottom: 1rem;
          font-weight: 600;
        }
        .checkmark {
          margin-right: 0.5rem;
          min-height: 20px;
          min-width: 20px;
        }
        button {
          width: 100%;
          background-color: ${button.backgroundColor.color};
          color: ${button.color.color};
          border: none;
          border-radius: 5px;
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          font-size: 1rem;
          font-weight: 700;
          margin-top: 1rem;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }
        button:hover {
          background-color: ${button.backgroundColorHover.color};
          color: ${button.colorHover.color};
        }

        @media (max-width: 768px) {
          .subscription {
            padding: ${theme.spacing.md};
          }
        }
        @media (max-width: 480px) {
          .subscription {
            padding: ${theme.spacing.sm};
          }
        }
      `}</style>
    </Card>
  )
}
