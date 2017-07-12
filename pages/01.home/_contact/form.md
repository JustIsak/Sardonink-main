---
title: 'Contact Form'
menu: Contact
lead: ''
form:
    name: contact-form
    action: /home
    fields:
        -
            name: name
            label: Name
            placeholder: 'My name is...'
            autocomplete: 'on'
            type: text
            validate:
                required: true
        -
            name: email
            label: Email
            placeholder: 'My email is...'
            type: text
            validate:
                rule: email
                required: true
        -
            name: message
            label: Message
            size: long
            placeholder: 'About that thing....'
            type: textarea
            validate:
                required: true
    buttons:
        -
            type: submit
            value: Submit
            class: submit
    process:
        -
            email:
                from: '{{ config.plugins.email.from }}'
                to: ['{{ config.plugins.email.to }}', '{{ form.value.email }}']
                subject: '[Feedback] {{ form.value.name|e }}'
                body: '{% include ''forms/data.html.twig'' %}'
        -
            save:
                fileprefix: feedback-
                dateformat: Ymd-His-u
                extension: txt
                body: '{% include ''forms/data.txt.twig'' %}'
        -
            message: 'Thank you for your feedback!'
        -
            display: thankyou
---

Intersted in working with me? Heard about my prize winning cookies? Ready to try something new?  Reach out and say hi. I'm only an email away. 

What do you have to lose?