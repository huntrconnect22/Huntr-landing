import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

const LLMS_CONTENT = `# HUNTR

> HUNTR (huntr.id) is a cloud-based B2B procurement platform and Strategic Sourcing Technology in Indonesia connecting enterprise buyers with verified vendors to streamline supplier discovery, open tenders, RFQs, e-catalogues, contract management, and secure corporate payments.

HUNTR brings the entire business procurement journey into a connected workflow, eliminating scattered emails, spreadsheets, and manual back-and-forth communication.

## Core Capabilities

- [Supplier Discovery](https://huntr.id/#capabilities): Discover verified suppliers and vendors matching business procurement needs across Indonesia.
- [Requests & Quotations (RFQ)](https://huntr.id/#how): Manage purchase requests, compare vendor quotations transparently, and track approvals.
- [Open Tenders](https://huntr.id/#tenders): Real-time marketplace of open enterprise tenders and public/private RFQs open for bidding.
- [B2B Marketplace](https://huntr.id/#marketplace): Digital e-catalogue of pre-vetted office supplies, industrial spare parts, MRO, and tech hardware.
- [Vendor Management](https://huntr.id/#vendors): Onboarding, compliance verification, and performance evaluation for enterprise vendors.
- [Contract & Fulfilment](https://huntr.id/#capabilities): Coordinate purchasing agreements, purchase orders, logistics, and delivery tracking.
- [HUNTR Pay](https://huntr.id/#about): Transaction and payment support built for corporate purchasing and commercial settlements.
- [Agentic Procurement](https://huntr.id/#faq): AI-assisted tools that help match business needs with suppliers and compare quotations.

## Public APIs & Integrations

- [Public RFQs API](https://huntr.id/api/rfqs): REST API providing real-time listing of active and public RFQs / open tenders.
- [Public Catalogues API](https://huntr.id/api/catalogues): REST API listing commercial products and verified vendor supplies.

## Optional

- [Full Documentation](https://huntr.id/llms-full.txt): Comprehensive technical, architectural, and operational documentation of the HUNTR platform for LLMs.
- [Web Application Portal](https://app.huntr.id/): Web portal for enterprise buyers and registered vendors.
- [Vendor Registration](https://app.huntr.id/register): Onboarding portal to register as a HUNTR verified supplier.
- [Company Profile & Contact](https://huntr.id/#about): Information about HUNTR, leadership team, vision, and mission.
`;

export async function GET() {
  return new NextResponse(LLMS_CONTENT, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400',
    },
  });
}
