import {
  EmptyState,
  Layout,
  Page,
  Button,
  Card,
  Stack,
  ButtonGroup,
  RadioButton,
  Thumbnail,
  Caption,
  DropZone,
} from "@shopify/polaris";
import { ResourcePicker, TitleBar } from "@shopify/app-bridge-react";
import store from "store-js";
import ResourceListWithProducts from "../components/ResourceList";
import React, { useState, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
const img = "https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg";

function Index(props) {
  const [value, setValue] = useState("userDefined");

  const handleChange = useCallback(
    (_checked, newValue) => setValue(newValue),
    []
  );

  const [open, setOpen] = useState(false);

  const [file, setFile] = useState();

  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) =>
      setFile((file) => acceptedFiles[0]),
    []
  );
  const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

  const fileUpload = !file && <DropZone.FileUpload />;
  const uploadedFile = file && (
    <Stack>
      <Thumbnail
        size="small"
        alt={file.name}
        source={
          validImageTypes.indexOf(file.type) > 0
            ? window.URL.createObjectURL(file)
            : "https://cdn.shopify.com/s/files/1/0757/9955/files/New_Post.png?12678548500147524304"
        }
      />
      <div>
        {file.name} <Caption>{file.size} bytes</Caption>
      </div>
    </Stack>
  );

  const emptyState = !store.get("ids");

  const handleSelection = (resources) => {
    const idsFromResources = resources.selection.map((product) => product.id);
    setOpen(false);
    store.set("ids", idsFromResources);
  };

  const [pageShow, setPageShow] = useState(false);

  return (
    <Page>
      <TitleBar
        title="Sample App"
        primaryAction={{
          content: "Create User Guide",
          onAction: () => setOpen(true),
        }}
      />
      {pageShow ? (
        <React.Fragment>
          <Card title="Status">
            <Card.Section>
              <Stack spacing="loose" vertical>
                <Stack distribution="trailing">
                  <ButtonGroup>
                    <Button primary>Enable</Button>
                    <Button plain>Disable</Button>
                  </ButtonGroup>
                </Stack>
              </Stack>
            </Card.Section>
          </Card>
          <Card title="Select Products for Guide">
            <Card.Section>
              <Stack spacing="loose" vertical>
                <Button primary onClick={() => setOpen(true)}>
                  {" "}
                  Select Products{" "}
                </Button>
              </Stack>
            </Card.Section>
          </Card>
          <Card>
            <Card.Section>
              <Stack vertical>
                <RadioButton
                  label="Create Guide"
                  helpText="Merchant can create new guide."
                  checked={value === "userDefined"}
                  id="userDefined"
                  name="accounts"
                  onChange={handleChange}
                />
                <RadioButton
                  label="Upload PDF"
                  helpText="Merchant can upload PDF if they have PDF Ready."
                  id="uploadPDF"
                  name="accounts"
                  checked={value === "uploadPDF"}
                  onChange={handleChange}
                />
              </Stack>
            </Card.Section>
          </Card>
          <Card title="Create User Guide">
            <Card.Section></Card.Section>
          </Card>
          {value === "uploadPDF" ? (
            <Card title="Upload User Guide PDF">
              <Card.Section>
                <DropZone allowMultiple={false} onDrop={handleDropZoneDrop}>
                  {uploadedFile}
                  {fileUpload}
                </DropZone>
              </Card.Section>
            </Card>
          ) : null}
        </React.Fragment>
      ) : null}

      <ResourcePicker
        resourceType="Product"
        showVariants={false}
        open={open}
        onSelection={(resources) => handleSelection(resources)}
        onCancel={() => setOpen(false)}
      />
      {emptyState ? (
        <Layout>
          <EmptyState
            heading="Discount your products temporarily"
            action={{
              content: "Create User Guide",
              onAction: () => {
                setPageShow(true);
              },
            }}
            image={img}
          >
            <p>Select products to change their price temporarily.</p>
          </EmptyState>
        </Layout>
      ) : (
        <ResourceListWithProducts />
      )}
    </Page>
  );
}

export default Index;
