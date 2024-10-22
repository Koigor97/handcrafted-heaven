import { artisanAccountAction } from "@/utils/authAction";
import ArtisanOnboardingForm from "@/components/onboarding/ArtisanOnBoardingForm";

export const description =
  "A sign up form with first name, last name, email and password inside a card. There's an option to sign up with Google and a link to login if you already have an account";

export default function ArtisanSignUpForm() {
  return <ArtisanOnboardingForm artisanAccountAction={artisanAccountAction} />;
}