import React from "react";
import styled from "styled-components";
import JSONInput from "react-json-editor-ajrm";
import { useLocalStorage } from "usehooks-ts";
import locale from "react-json-editor-ajrm/locale/en";

type JsonData = {
  plainText: string;
  markupText: string;
  json: string;
  jsObject?: object;
  lines: number;
  error: boolean;
};

const StyledJSONInput = styled(JSONInput)`
  margin-top: 10px;
  padding: 5px;

  [name="outer-box"] > div {
    transform: translate(-75%, 25%);
  }
`;

export const defaultValue = [
  {
    author: "John Doe",
    pseudonym: "J.D.",
    books: [
      {
        title: "Book 1",
      },
      {
        title: "Book 2",
        chapters: [
          {
            title: "No Way Home",
            page: 256,
          },
        ],
      },
    ],
    age: 26,
  },
];

export const JsonEditor: React.FC = () => {
  const [json, setJson] = useLocalStorage("json", JSON.stringify(defaultValue));

  React.useEffect(() => {
    const element = document.querySelector(
      '[name="outer-box"] > div'
    ) as HTMLDivElement;
    if (element) {
      element.style.transform = "translate(-75%, 25%)";
    }
  }, []);

  return (
    <StyledJSONInput
      placeholder={JSON.parse(json)}
      onChange={(value: JsonData) => {
        try {
          JSON.parse(value.json);
          setJson(value.json);
        } catch (error: any) {
          console.error("Invalid JSON!", error.stack);
        }
      }}
      locale={locale}
      height="100%"
    />
  );
};
