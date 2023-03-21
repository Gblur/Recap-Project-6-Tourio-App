import Link from "next/link.js";
import styled from "styled-components";
import { useRouter } from "next/router";
import Form from "../components/Form.js";
import { StyledLink } from "../components/StyledLink.js";
import useSWR from "swr";

const StyledBackLink = styled(StyledLink)`
  justify-self: flex-start;
`;

const defaultData = {
  name: "",
  image:
    "https://images.unsplash.com/photo-1553547274-0df401ae03c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGF1c3NlbmFsc3RlciUyMGhhbWJ1cmd8ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60",
  location: "",
  mapURL:
    "https://www.google.com/maps/place/Elbphilharmonie+Hamburg/@53.543085,9.9859608,15.47z/data=!4m5!3m4!1s0x47b18f066770c44f:0xb2e4ab2a68984286!8m2!3d53.5413297!4d9.9841308",
  description: "",
};

export default function CreatePlacePage() {
  const router = useRouter();

  async function addPlace(place) {
    const response = await fetch("/api/places", {
      method: "POST",
      body: JSON.stringify(place),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      await response.json();
      router.push("/");
    } else {
      console.error(response.status);
    }
  }

  return (
    <>
      <h2 id="add-place">Add Place</h2>
      <Link href="/" passHref legacyBehavior>
        <StyledBackLink>back</StyledBackLink>
      </Link>
      <Form onSubmit={addPlace} formName={"add-place"} />
    </>
  );
}
