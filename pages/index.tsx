import { ReactElement } from "react";
import { PrimaryLayout } from "../components/layouts";
import { TNextPageWithLayout } from "../types";
import {
  Container,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";
import Image from "next/image";
import * as notion from "../utils/notion";
import { ViewArticles } from "../components/common";

const Root = styled("div")``;

const Hero = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 300px);
  row-gap: ${({ theme }) => theme.spacing(8)};

  ${({ theme }) => theme.breakpoints.down("sm")} {
    min-height: calc(100vh - 200px);
  }
`;

const PrimaryLinks = styled(Link)`
  font-family: "Roboto Slab";
  text-decoration: none;
  color: ${({ theme }) => theme.palette.primary.light};

  &:hover {
    color: ${({ theme }) => theme.palette.primary.dark};
    text-decoration: underline;
  }
`;

const HeroTitle = styled(Typography)`
  max-width: 1000px;
  font-size: 36px;
  font-weight: 600;
  line-height: 50px;
  text-align: center;
  font-family: "Roboto Slab";

  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 28px;
    line-height: 42px;
  }
`;

const StyledTypeAnimation = styled(TypeAnimation)`
  font-size: 36px;
  display: inline-block;
  font-family: "Roboto Slab";
  font-weight: 700;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 28px;
  }
`;

const LogoContainer = styled("div")`
  display: flex;
  flex-direction: row;
  column-gap: ${({ theme }) => theme.spacing(5)};
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    column-gap: ${({ theme }) => theme.spacing(3)};
  }
`;

const DetailsContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  row-gap: ${({ theme }) => theme.spacing(4)};
  text-align: center;

  ${({ theme }) => theme.breakpoints.up("xl")} {
    max-width: 800px;
  }

  ${({ theme }) => theme.breakpoints.up("lg")} {
    max-width: 800px;
  }
`;

const Details = styled(Typography)`
  font-size: 18px;
  line-height: 38px;
  font-family: "Roboto Slab";

  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 20px;
  }
`;

const ViewArticlesContainer = styled(Container)`
  margin-top: ${({ theme }) => theme.spacing(16)};

  display: flex;
  flex-direction: column;
  row-gap: ${({ theme }) => theme.spacing(4)};

  ${({ theme }) => theme.breakpoints.up("xl")} {
    max-width: 1000px;
  }
`;

export interface IHomeProps {
  blocksBySlug: Record<string, any>;
}

const logos = [
  {
    url: "/argo-icon.svg",
    alt: "Argo icon",
    width: 80,
    height: 80,
  },
  {
    url: "/airflow-icon.svg",
    alt: "Airflow icon",
    width: 55,
    height: 55,
  },
  {
    url: "/dagster-icon.svg",
    alt: "Dagster icon",
    width: 100,
    height: 100,
  },
  {
    url: "/mulesoft-icon.svg",
    alt: "Mulesoft icon",
    width: 70,
    height: 70,
  },
];

const Home: TNextPageWithLayout<IHomeProps> = (props: IHomeProps) => {
  const { blocksBySlug } = props;
  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Root>
      <Hero>
        <HeroTitle variant="h1">
          We help data-centric organizations <br />
          <StyledTypeAnimation
            sequence={[
              "reduce technical debt",
              5000,
              "optimize operations",
              5000,
              "reduce cloud costs",
              5000,
            ]}
            speed={89}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
          />
          <br />
          with modern, cloud native solutions.
        </HeroTitle>
        <LogoContainer>
          {logos.map((logo) => (
            <Image
              key={logo.url}
              src={logo.url}
              alt={logo.alt}
              width={logo.width * (largeScreen ? 0.7 : 0.6)}
              height={logo.height * (largeScreen ? 0.7 : 0.6)}
            />
          ))}
        </LogoContainer>
      </Hero>
      <DetailsContainer>
        <Details>
          We partner with data-centric organizations to help reduce technical debt, decrease cloud costs, identify technical bottlenecks, and optimize operations with modern, cloud native solutions.
        </Details>
        <Details>
          We are a team of data engineers, data scientists, and software engineers with experience in a variety of industries including healthcare, finance, and retail.
        </Details>
        <Details>
          Get <PrimaryLinks href="/contact">in touch</PrimaryLinks> with us today to learn how we can help.
        </Details>
      </DetailsContainer>
      <ViewArticlesContainer>
        <ViewArticles blocksBySlug={blocksBySlug} />
      </ViewArticlesContainer>
    </Root>
  );
};

Home.getLayout = (children: ReactElement): ReactElement => {
  return <PrimaryLayout>{children}</PrimaryLayout>;
};

export async function getStaticProps(context: any) {
  const blocksBySlug = await notion.getAllPages(process.env.ROOT_PAGE_ID!);
  return {
    props: {
      blocksBySlug,
    },
  };
}

export default Home;
