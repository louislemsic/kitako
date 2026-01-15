## AGREEMENT TO OUR DELETION POLICY

This Deletion Policy explains how you can delete your data from Kitako and what happens when you do so. Since Kitako is a browser-only expense tracker that stores all data locally on your device, you have complete control over your data deletion.

**Kitako** ("we," "us," "our") is an open-source, privacy-first expense tracker application that runs entirely in your browser. All your data is stored locally on your device using IndexedDB, and we never have access to it.

By using Kitako, you acknowledge that you have read, understood, and agree to this Deletion Policy. If you do not agree with this policy, you should not use Kitako.

## 1. YOUR RIGHT TO DELETE DATA

### 1.1. Complete Control

**In Short:** You have complete control over your data and can delete it at any time.

Since Kitako stores all data locally on your device, you have the right to delete your data at any time, for any reason, without needing to contact us or request permission. Your data belongs to you, and you have full control over it.

### 1.2. What Data Can Be Deleted

When you delete your data in Kitako, the following information is permanently removed from your device:
- All account information (names, types, balances)
- All transaction records (expenses, income, transfers)
- All category configurations
- All application settings and preferences
- Any other data stored by the application in IndexedDB

**Note:** Once deleted, this data cannot be recovered unless you have created a backup yourself.

## 2. HOW TO DELETE YOUR DATA

### 2.1. Using the Application's Deletion Feature

Kitako provides a built-in data deletion feature that allows you to permanently delete all your data. To use this feature:

1. Navigate to the Settings page in the application
2. Locate the "Delete All Data" or similar option
3. Follow the prompts to confirm deletion
4. All your data will be permanently removed from your device's IndexedDB storage

### 2.2. Manual Deletion Through Browser

You can also delete your data manually by clearing your browser's storage:

1. Open your browser's developer tools (usually F12 or right-click → Inspect)
2. Navigate to the Application or Storage tab
3. Find IndexedDB in the storage list
4. Delete the Kitako database
5. Optionally, clear all site data for Kitako

**Warning:** Clearing browser storage will delete all data for Kitako and cannot be undone.

### 2.3. Uninstalling the Application

If you have installed Kitako as a Progressive Web App (PWA), uninstalling the application may also remove associated data, depending on your browser and device settings. However, to ensure complete deletion, use the application's built-in deletion feature or manually clear browser storage as described above.

## 3. WHAT HAPPENS WHEN YOU DELETE YOUR DATA

### 3.1. Immediate Deletion

**In Short:** Your data is permanently deleted from your device immediately.

When you delete your data using Kitako's deletion feature:
- All data stored in IndexedDB is immediately and permanently removed
- The application will return to its initial state (as if you're using it for the first time)
- You will need to set up your accounts again if you want to continue using the application

### 3.2. No Server-Side Deletion Required

Since Kitako doesn't store your data on any servers, there's no server-side deletion process. Your data is only stored on your device, so deleting it from your device means it's completely gone.

### 3.3. No Recovery

**Important:** Once you delete your data, it cannot be recovered. We don't have backups of your data because we never had access to it in the first place. If you want to preserve your data before deleting, you should:

- Export your data (if the application provides export functionality)
- Create a manual backup by copying data from your browser's IndexedDB
- Take screenshots of important information

## 4. DATA RETENTION

### 4.1. We Don't Retain Your Data

**In Short:** We don't retain your data because we never collect it.

Kitako does not retain your data for any period because we never collect or store it on our servers. Your data exists only on your device, and you control how long it's stored there.

### 4.2. Local Storage Duration

Your data remains on your device until:
- You explicitly delete it using the application's deletion feature
- You clear your browser's storage data
- You uninstall the application (depending on browser/device settings)
- Your browser automatically clears storage (rare, usually only when storage is full)

We have no control over or access to your local storage, so we cannot delete it for you or set retention periods.

## 5. BACKUP AND DATA EXPORT

### 5.1. Your Responsibility

**In Short:** You are responsible for backing up your data if you want to preserve it.

Since Kitako stores data locally on your device, you are responsible for creating backups if you want to preserve your data. Kitako may provide export functionality to help you create backups, but this is not guaranteed.

### 5.2. Recommended Backup Practices

Before deleting your data, consider:
- Exporting your data if the application provides export functionality
- Taking screenshots of important information
- Manually copying data from IndexedDB (advanced users)
- Using browser sync features if available (though this may sync data across devices)

## 6. DELETION REQUESTS

### 6.1. No Request Needed

**In Short:** You don't need to request deletion from us because we don't have your data.

Since Kitako doesn't collect or store your data on any servers, you don't need to submit a deletion request to us. You can delete your data directly through the application at any time.

### 6.2. If You Need Help

If you need assistance with deleting your data or have questions about the deletion process:
- Review the application's documentation
- Check the open-source code to understand how deletion works
- Submit questions through the project's GitHub repository (if applicable)

## 7. AUTOMATIC DELETION

### 7.1. We Don't Automatically Delete Your Data

Kitako does not automatically delete your data. Your data remains on your device until you explicitly delete it or clear your browser storage.

### 7.2. Browser Behavior

Your browser may automatically clear storage in rare circumstances:
- If your device storage is full
- If you haven't used the application for an extended period (browser-dependent)
- If you clear browser data through browser settings

These are browser behaviors, not Kitako behaviors, and we have no control over them.

## 8. DELETION VERIFICATION

### 8.1. How to Verify Deletion

After deleting your data, you can verify it's been deleted by:
- Checking that the application shows no accounts or transactions
- Using browser developer tools to inspect IndexedDB storage
- Confirming the application has returned to its initial state

### 8.2. We Cannot Verify for You

Since we don't have access to your device or your data, we cannot verify deletion for you. You must verify deletion yourself using the methods above.

## 9. THIRD-PARTY DATA

### 9.1. No Third-Party Data Collection

**In Short:** We don't collect data from third parties, so there's no third-party data to delete.

Kitako does not integrate with third-party services that would collect your data. There is no third-party data to delete because we don't collect any third-party data.

## 10. CHANGES TO THIS DELETION POLICY

### 10.1. Policy Updates

We may update this Deletion Policy from time to time to reflect changes in the application or to clarify our practices. However, our core principle will not change: you always have complete control over your data and can delete it at any time.

### 10.2. Notification of Changes

Since we don't have user accounts or contact information, we cannot notify you directly of policy changes. You should periodically review this policy when you use the application.

## 11. CONTACT INFORMATION

### 11.1. Questions About Deletion

If you have questions about deleting your data or this Deletion Policy:
- Review the application's source code (it's open-source)
- Check the application's documentation
- Submit questions through the project's GitHub repository (if applicable)

### 11.2. Open-Source Verification

Since Kitako is open-source, you can verify our deletion practices by examining the source code. The code will show that:
- Data is stored only in IndexedDB on your device
- Deletion removes data only from your device
- No data is transmitted to any servers
- No data is retained after deletion

## 12. ACKNOWLEDGMENT

By using Kitako, you acknowledge that:
- You understand that your data is stored locally on your device
- You have complete control over your data and can delete it at any time
- Once deleted, your data cannot be recovered
- You are responsible for backing up your data if you want to preserve it
- We do not have access to your data and cannot delete it for you
- You must delete your data yourself using the application's features or browser tools

This Deletion Policy is part of Kitako's commitment to privacy and user control. Your data is yours, and you decide what happens to it.
