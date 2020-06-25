---
templateKey: blog-post
title: Custom Error Handler while Validating XML against XSD Schema
date: 2020-06-25T17:51:19.049Z
description: "A Custom Error Handler while Validating XML against XSD. "
featuredpost: true
featuredimage: /img/overview-of-xml-an-indispensable-tool-in-everyday-life-1.png
tags:
  - XML XSD
---
<!--StartFragment-->

In this example we create a Custom Error Handler while Validating XML against XSD. We use the`javax.xml.validation.Validator`to check the XML document against the XSD schema. We can create a custom error handler which will handle the error generated from the`validator.validate()`method. Next we need to register our custom error handler using the`validator.setErrorHandler()`method. This will instruct the validator to use our custom error handler when there is an exception.

## Project structure

```
+--src
|   +--main
|       +--java
|           +--com
|               +--memorynotfound
|                   |--ValidateXmlXsd.java
|       +--resources
|           |--schema.xsd
pom.xml
```

## XSD Schema

```
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">

    <xs:element name="course">
        <xs:complexType>
            <xs:all>
                <xs:element type="xs:string" name="name"/>
                <xs:element type="xs:string" name="description"/>
            </xs:all>
            <xs:attribute type="xs:integer" name="id"/>
        </xs:complexType>
    </xs:element>

</xs:schema
```

## Custom Error Handler while Validating XML against XSD

We can handle warnings, errrors or fatalErrors. When one of these events occure we can construct a custom error message. In this example the error message contains the line and column number and a message.

```
package com.memorynotfound.xml.xsd;

import org.xml.sax.ErrorHandler;
import org.xml.sax.SAXException;
import org.xml.sax.SAXParseException;
/**
  * custom error handler while validating xml against xsd
  */
public class XsdErrorHandler implements ErrorHandler {

    @Override
    public void warning(SAXParseException exception) throws SAXException {
        handleMessage("Warning", exception);
    }

    @Override
    public void error(SAXParseException exception) throws SAXException {
        handleMessage("Error", exception);
    }

    @Override
    public void fatalError(SAXParseException exception) throws SAXException {
        handleMessage("Fatal", exception);
    }

    private String handleMessage(String level, SAXParseException exception) throws SAXException {
        int lineNumber = exception.getLineNumber();
        int columnNumber = exception.getColumnNumber();
        String message = exception.getMessage();
        throw new SAXException("[" + level + "] line nr: " + lineNumber + " column nr: " + columnNumber + " message: " + message);
    }
}
```

## XSD Validator

To validate XML against XSD schema we need to create a schema. And create a validator. We also need to register our custom error handler. We do this by calling the`validator.setErrorHandler()`method with our custom error handler. When there is a validation exception the validator throws a`SAXException`. This exception will print our custom error handler exception.

```
package com.memorynotfound.xml.xsd;

import org.xml.sax.SAXException;

import javax.xml.XMLConstants;
import javax.xml.transform.stream.StreamSource;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import javax.xml.validation.Validator;
import java.io.IOException;
import java.io.StringReader;

/**
  * custom error handler while validating xml against xsd
  */
public class ValidateXmlXsd {

    public static String xml =
            "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n" +
            "<course id=\"1-ID\">\n" +
            "    <name>JAX-B</name>\n" +
            "    <description>Validate XML against XSD Schema</description>\n" +
            "</course>";

    public static void main(String... args) {
        try {
            System.out.println("Custom Error Handler while Validating XML against XSD");
            SchemaFactory factory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
            Schema schema = factory.newSchema(ValidateXmlXsd.class.getResource("/schema.xsd"));
            Validator validator = schema.newValidator();
            validator.setErrorHandler(new XsdErrorHandler());
            validator.validate(new StreamSource(new StringReader(xml)));
            System.out.println("Validation is successful");
        } catch (IOException e) {
            // handle exception while reading source
        } catch (SAXException e) {
            System.out.println("Custom Error Handler while Validating XML against XSD");
            System.out.println("Message: " + e.getMessage());
        }
    }
}
```

#### Output

```
Validate XML against XSD Schema
Error when validate XML against XSD Schema
Message: [Error] line nr: 2 column nr: 19 message: cvc-datatype-valid.1.2.1: '1-ID' is not a valid value for 'integer'.
```

<!--EndFragment-->