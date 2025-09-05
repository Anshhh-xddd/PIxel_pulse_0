# EmailJS Setup Guide for Contact Form

## 🚀 Quick Setup (5 minutes)

### Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/) and sign up for a free account
2. Verify your email address

### Step 2: Create Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Connect your email account
5. **Copy your Service ID** (you'll need this)

### Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

```html
Subject: New Contact Form Submission from {{from_name}}

Name: {{from_name}}
Email: {{from_email}}
Company: {{company}}
Message: {{message}}

This is a new contact form submission from your website.
```

4. **Copy your Template ID** (you'll need this)

### Step 4: Get Your User ID
1. Go to "Account" → "API Keys"
2. **Copy your Public Key** (User ID)

### Step 5: Update Your Code
Replace these placeholders in your files:

**In `index.html`:**
```javascript
emailjs.init("YOUR_USER_ID"); // Replace with your actual User ID
```

**In `src/components/Contact.tsx`:**
```javascript
await emailjs.send(
  'YOUR_SERVICE_ID', // Replace with your Service ID
  'YOUR_TEMPLATE_ID', // Replace with your Template ID
  templateParams,
  'YOUR_USER_ID' // Replace with your User ID
);
```

### Step 6: Test
1. Run your project: `npm run dev`
2. Fill out the contact form
3. Submit and check your email!

## 📧 What You'll Receive

When someone fills out your contact form, you'll get an email with:
- ✅ Their name
- ✅ Their email address
- ✅ Their company (if provided)
- ✅ Their message
- ✅ Professional formatting

## 🔧 Alternative: Simple Formspree Setup

If you prefer a simpler solution, you can use Formspree:

1. Go to [Formspree.io](https://formspree.io/)
2. Create a free account
3. Create a new form
4. Replace the form action in Contact.tsx:

```jsx
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  {/* your form fields */}
</form>
```

## 🎯 Benefits

- ✅ **Real-time emails** - Get notified instantly
- ✅ **No backend needed** - Works with static hosting
- ✅ **Spam protection** - Built-in filtering
- ✅ **Mobile friendly** - Works on all devices
- ✅ **Professional** - Clean email formatting

## 💡 Pro Tips

1. **Test thoroughly** - Send test emails to yourself first
2. **Check spam folder** - First emails might go to spam
3. **Monitor usage** - Free tier has limits
4. **Backup emails** - Consider multiple email addresses

Your contact form will now send real emails directly to your inbox! 🎉 