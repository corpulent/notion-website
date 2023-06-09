import { Typography, styled } from "@mui/material";
import { Heading2BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { FunctionComponent, ReactElement } from "react";

const Root = styled("div")``;

const Heading = styled(Typography)`
  font-family: "Roboto Slab";
  font-size: 20px;
  font-weight: 500;
  margin-top: ${({ theme }) => theme.spacing(4)};
`;

export interface IHeading2BlockProps {
  block: Heading2BlockObjectResponse;
}

export const Heading2Block: FunctionComponent<IHeading2BlockProps> = (
  props: IHeading2BlockProps
): ReactElement => {
  const { block } = props;
  return (
    <Root>
      {block.heading_2.rich_text.map((richText, index) => (
        <Heading key={index} variant="h2">
          {richText.plain_text}
        </Heading>
      ))}
    </Root>
  );
};
