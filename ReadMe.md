# Overview

This project consists of a set of scripts designed to interact with the Hygraph Content Management System (CMS). It automates the process of schema creation and content upload, leveraging the Hygraph Management SDK and custom scripts for uploading media and content entries. The project structure facilitates the separation of concerns, with distinct scripts for setup, media uploading, content creation, and utility functions.

### Files Description

setup.js: Utilizes the Hygraph Management SDK to programmatically create the schema within Hygraph. It defines models and fields necessary for the project.
upload.js: Handles the uploading of content entries to Hygraph using the Content API. It reads data from a local JSON file, processes it, and uploads it as content entries.
mediaUploader.js: A utility script designed to upload media files to Hygraph and return their IDs for association with content entries.
cleanObjects.js: Provides functionality to clean and prepare data objects before they are uploaded, ensuring that the data format matches what Hygraph expects.
index.js: Serves as the entry point of the script, orchestrating the schema creation and content upload process by calling functions defined in other scripts.

### Modification Guide

#### Using an External API Endpoint for Uploads:

To modify the project to use an external API endpoint for uploads (instead of directly interacting with Hygraph), follow these steps:

1. Identify the Upload Functionality: Determine which parts of your code are responsible for uploading content to Hygraph. In this project, upload.js and mediaUploader.js are the primary files handling uploads.
2. Update the Endpoint Configuration: In upload.js and mediaUploader.js, replace the Hygraph endpoint and token environment variables with those of your external API. This involves changing HYGRAPH_ENDPOINT and HYGRAPH_TOKEN to the endpoint URL and authentication token of your external API.
const API_ENDPOINT = process.env.EXTERNAL_API_ENDPOINT; // Your external API endpoint
const API_TOKEN = process.env.EXTERNAL_API_TOKEN; // Your external API authentication token
3. Adjust the Upload Logic: Modify the logic within upload.js and mediaUploader.js to match the request format expected by your external API. This may involve changing the structure of the HTTP request body, headers, and the way responses are handled.
4. Test the Integration: After making the necessary changes, test the integration with your external API to ensure that uploads are working as expected. Pay close attention to any errors or issues that arise and adjust your code accordingly.
5. Update Documentation: Reflect any changes made to the project in your documentation, ensuring that future users or contributors understand how to interact with the external API and what has been modified from the original implementation.


### General Advice
Review API Documentation: Before making any changes, references for the HyGraph content upload and management/sdk APIs should be reviewed to ensure proper usage. Here you can learn more about both and about implementing auth etc. [Link to api reference](https://studio-docs.hygraph.com/guides/overview/api-access#permanent-auth-tokens)

## Zost = Ezoic Blog Post Object
Below is the model for Ezoic blog content that can be used to graph and align external endpoint or file uploads of content to our Hygraph CMS. Shiba, shiba.

### Uploading to Content to Ezoic blog

Content will need to be modeled and uploading according to our content schema model. See Tyler for json ref if needed. Below is an overview of the object for blog posts and all available and necessary fields.

```txt
NOTE: The management sdk can be used to create new fields
or modify existying ones; but modifying existing 
fields should be carefully considered so you don't fuck up our shit.
```

### "Zost(s)" Imported and continued schema for ezoic blogs
```GraphQL
Implements: Zost! [Node, Entity, Fields ]
stage: Stage!
System stage field

documentInStages(
includeCurrent: Boolean! = false
inheritLocale: Boolean! = false
stages: [Stage!]! = [DRAFT, PUBLISHED]
): [Zost!]!
Get the document in other stages

publishedAt: DateTime
The time the document was published. Null on documents in draft stage.

updatedAt: DateTime!
The time the document was updated

createdAt: DateTime!
The time the document was created

id: ID!
The unique identifier

title: String
title tag and headline

description: String
meta description and OG description

slug: String
generate from title

date: Date
date of blog publishing

dateModified: Date
Date a post was changed or updated

body: ZostBodyRichText
The content for this blog

publishedBy(
forceParentLocale: Boolean
locales: [Locale!]
): User
User that last published this document

updatedBy(
forceParentLocale: Boolean
locales: [Locale!]
): User
User that last updated this document

createdBy(
forceParentLocale: Boolean
locales: [Locale!]
): User
User that created this document

author(
forceParentLocale: Boolean
locales: [Locale!]
): Author
post creator

mainImage(
forceParentLocale: Boolean
locales: [Locale!]
): Asset
The featured image or hero image for the article.

scheduledIn(
after: String
before: String
first: Int
forceParentLocale: Boolean
last: Int
locales: [Locale!]
skip: Int
where: ScheduledOperationWhereInput
): [ScheduledOperation!]!
history(
limit: Int! = 10
skip: Int! = 0
stageOverride: Stage
): [Version!]!
```
