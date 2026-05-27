export const IT_SUPPORT_SNIPPETS = [
  {
    type: "folder",
    name: "Account Issues",
    files: [
      {
        type: "file",
        name: "Password Reset",
        content:
          "Hi {User},\n\nI've reset your password. Please check your email for the temporary password and update it upon first login.\n\nBest regards,\n{Agent}",
      },
      {
        type: "file",
        name: "Account Locked",
        content:
          "Hello {User},\n\nYour account has been unlocked. You can now access the system using your existing credentials. If you continue to experience issues, please let me know.\n\nRegards,\n{Agent}",
      },
      {
        type: "file",
        name: "New User Setup",
        content:
          "Hi {User},\n\nYour account has been created successfully. Login credentials:\nUsername: {Username}\nTemporary Password: {TempPassword}\n\nPlease change your password on first login.\n\nWelcome aboard!\n{Agent}",
      },
      {
        type: "file",
        name: "Account Deletion",
        content:
          "Hello {User},\n\nYour account deletion request has been processed. All associated data will be removed within 30 days as per our data retention policy.\n\nRegards,\n{Agent}",
      },
      {
        type: "folder",
        name: "Two-Factor Authentication",
        files: [
          {
            type: "file",
            name: "2FA Setup",
            content:
              "Hi {User},\n\nTwo-factor authentication has been enabled for your account. Please use the QR code sent to your email to configure your authenticator app.\n\nBest regards,\n{Agent}",
          },
          {
            type: "file",
            name: "2FA Reset",
            content:
              "Hello {User},\n\nYour 2FA has been reset. Please set up a new authenticator using the link sent to your backup email.\n\nRegards,\n{Agent}",
          },
          {
            type: "file",
            name: "Backup Codes",
            content:
              "Hi {User},\n\nHere are your 2FA backup codes. Please store them securely:\n{Codes}\n\nBest,\n{Agent}",
          },
        ],
      },
    ],
  },
  {
    type: "folder",
    name: "Hardware Issues",
    files: [
      {
        type: "file",
        name: "Laptop Request",
        content:
          "Hi {User},\n\nYour laptop request has been approved. Expected delivery: {Date}. You'll receive an email once it's ready for pickup.\n\nBest,\n{Agent}",
      },
      {
        type: "file",
        name: "Printer Problems",
        content:
          "Hello {User},\n\nI've resolved the printer issue. The device is now online and ready to use. Please test and let me know if you encounter any problems.\n\nRegards,\n{Agent}",
      },
      {
        type: "file",
        name: "Monitor Replacement",
        content:
          "Hi {User},\n\nA replacement monitor has been ordered. Expected arrival: {Date}. We'll schedule installation once it arrives.\n\nThank you,\n{Agent}",
      },
      {
        type: "folder",
        name: "Desktop Issues",
        files: [
          {
            type: "file",
            name: "Computer Won't Start",
            content:
              "Hello {User},\n\nI've diagnosed the issue with your desktop. The problem appears to be {Issue}. I'll schedule a technician visit for {Date}.\n\nRegards,\n{Agent}",
          },
          {
            type: "file",
            name: "Slow Performance",
            content:
              "Hi {User},\n\nI've optimized your system and cleared temporary files. Your computer should now run faster. Please restart and test.\n\nBest,\n{Agent}",
          },
          {
            type: "file",
            name: "Blue Screen Errors",
            content:
              "Hello {User},\n\nI've identified the cause of the blue screen errors. We'll need to {Action}. I'll schedule this for {Date}.\n\nRegards,\n{Agent}",
          },
        ],
      },
      {
        type: "folder",
        name: "Mobile Devices",
        files: [
          {
            type: "file",
            name: "Phone Setup",
            content:
              "Hi {User},\n\nYour company phone has been configured with email and required apps. Device ID: {ID}.\n\nBest regards,\n{Agent}",
          },
          {
            type: "file",
            name: "Tablet Issues",
            content:
              "Hello {User},\n\nI've resolved the tablet connectivity issue. Please update to the latest OS version for optimal performance.\n\nRegards,\n{Agent}",
          },
          {
            type: "folder",
            name: "Mobile Security",
            files: [
              {
                type: "file",
                name: "Device Lost",
                content:
                  "Hi {User},\n\nI've remotely locked your device and initiated location tracking. Please contact security immediately.\n\nUrgent,\n{Agent}",
              },
              {
                type: "file",
                name: "Device Wipe",
                content:
                  "Hello {User},\n\nAs requested, your device has been remotely wiped. All company data has been removed.\n\nRegards,\n{Agent}",
              },
            ],
          },
        ],
      },
      {
        type: "folder",
        name: "Peripherals",
        files: [
          {
            type: "file",
            name: "Keyboard Replacement",
            content:
              "Hi {User},\n\nA replacement keyboard has been ordered. Expected arrival: {Date}.\n\nBest,\n{Agent}",
          },
          {
            type: "file",
            name: "Mouse Issues",
            content:
              "Hello {User},\n\nI've troubleshot your mouse connection. Try using a different USB port or replacing the batteries.\n\nRegards,\n{Agent}",
          },
          {
            type: "file",
            name: "Headset Support",
            content:
              "Hi {User},\n\nYour new headset has been configured for Teams/Zoom. Audio settings have been optimized.\n\nBest,\n{Agent}",
          },
          {
            type: "folder",
            name: "Docking Station",
            files: [
              {
                type: "file",
                name: "Setup Instructions",
                content:
                  "Hello {User},\n\nHere are the setup instructions for your docking station:\n1. {Step 1}\n2. {Step 2}\n3. {Step 3}\n\nRegards,\n{Agent}",
              },
              {
                type: "file",
                name: "Connection Problems",
                content:
                  "Hi {User},\n\nI've updated your docking station firmware. Please reconnect all cables and restart your laptop.\n\nBest,\n{Agent}",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: "folder",
    name: "Software Access",
    files: [
      {
        type: "file",
        name: "License Activation",
        content:
          "Hello {User},\n\nYour {Software} license has been activated. Please restart the application to apply the changes.\n\nBest regards,\n{Agent}",
      },
      {
        type: "file",
        name: "Software Installation",
        content:
          "Hi {User},\n\nI've installed {Software} on your system. The application is ready to use. Let me know if you need any assistance with setup.\n\nRegards,\n{Agent}",
      },
      {
        type: "file",
        name: "Access Request Approved",
        content:
          "Hello {User},\n\nYour access request for {System} has been approved. You should now have the necessary permissions.\n\nBest,\n{Agent}",
      },
      {
        type: "folder",
        name: "Microsoft 365",
        files: [
          {
            type: "file",
            name: "Outlook Issues",
            content:
              "Hi {User},\n\nI've reconfigured your Outlook profile. Your emails should now sync properly. Please restart Outlook.\n\nBest regards,\n{Agent}",
          },
          {
            type: "file",
            name: "Teams Problems",
            content:
              "Hello {User},\n\nI've resolved the Teams connectivity issue. Please clear your cache and sign in again.\n\nRegards,\n{Agent}",
          },
          {
            type: "file",
            name: "OneDrive Sync",
            content:
              "Hi {User},\n\nYour OneDrive sync issues have been fixed. All files should now be up to date.\n\nBest,\n{Agent}",
          },
          {
            type: "folder",
            name: "SharePoint Access",
            files: [
              {
                type: "file",
                name: "Site Permission",
                content:
                  "Hello {User},\n\nYou've been granted access to the {Site} SharePoint site with {Permission} level.\n\nRegards,\n{Agent}",
              },
              {
                type: "file",
                name: "Document Library",
                content:
                  "Hi {User},\n\nThe document library has been set up. You can now upload and share files with your team.\n\nBest,\n{Agent}",
              },
            ],
          },
        ],
      },
      {
        type: "folder",
        name: "Adobe Creative Cloud",
        files: [
          {
            type: "file",
            name: "Photoshop License",
            content:
              "Hello {User},\n\nYour Photoshop license has been activated. You can now access all premium features.\n\nRegards,\n{Agent}",
          },
          {
            type: "file",
            name: "Illustrator Setup",
            content:
              "Hi {User},\n\nIllustrator has been installed and configured. Your custom workspace settings have been applied.\n\nBest,\n{Agent}",
          },
          {
            type: "file",
            name: "Creative Cloud Sync",
            content:
              "Hello {User},\n\nYour Creative Cloud libraries are now syncing properly across all devices.\n\nRegards,\n{Agent}",
          },
        ],
      },
      {
        type: "folder",
        name: "Development Tools",
        files: [
          {
            type: "file",
            name: "IDE Installation",
            content:
              "Hi {User},\n\nYour development environment has been set up. All required extensions and plugins are installed.\n\nBest regards,\n{Agent}",
          },
          {
            type: "folder",
            name: "Version Control",
            files: [
              {
                type: "file",
                name: "Git Access",
                content:
                  "Hello {User},\n\nYour Git repository access has been configured. SSH keys have been added to your profile.\n\nRegards,\n{Agent}",
              },
              {
                type: "file",
                name: "Repository Permissions",
                content:
                  "Hi {User},\n\nYou've been granted {Permission} access to the {Repository} repository.\n\nBest,\n{Agent}",
              },
            ],
          },
          {
            type: "folder",
            name: "Database Access",
            files: [
              {
                type: "file",
                name: "MySQL Connection",
                content:
                  "Hello {User},\n\nYour MySQL database credentials:\nHost: {Host}\nUsername: {Username}\nPassword: {Password}\n\nRegards,\n{Agent}",
              },
              {
                type: "file",
                name: "PostgreSQL Setup",
                content:
                  "Hi {User},\n\nPostgreSQL access has been configured. Connection string sent to your email.\n\nBest,\n{Agent}",
              },
            ],
          },
        ],
      },
      {
        type: "folder",
        name: "Business Applications",
        files: [
          {
            type: "file",
            name: "CRM Access",
            content:
              "Hello {User},\n\nYour CRM account has been activated with {Role} permissions.\n\nRegards,\n{Agent}",
          },
          {
            type: "folder",
            name: "ERP System",
            files: [
              {
                type: "file",
                name: "SAP Access",
                content:
                  "Hi {User},\n\nYour SAP credentials have been created. Please attend the training session on {Date}.\n\nBest,\n{Agent}",
              },
              {
                type: "file",
                name: "Module Permissions",
                content:
                  "Hello {User},\n\nYou've been granted access to the following SAP modules: {Modules}.\n\nRegards,\n{Agent}",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: "folder",
    name: "Network Issues",
    files: [
      {
        type: "file",
        name: "WiFi Troubleshooting",
        content:
          "Hi {User},\n\nI've refreshed your network connection. Please disconnect and reconnect to the WiFi. If the issue persists, restart your device.\n\nRegards,\n{Agent}",
      },
      {
        type: "file",
        name: "VPN Setup",
        content:
          "Hello {User},\n\nYour VPN access has been configured. Please use the credentials sent to your email to connect.\n\nBest,\n{Agent}",
      },
      {
        type: "file",
        name: "Ethernet Problems",
        content:
          "Hi {User},\n\nI've tested the ethernet port in your office. Please try using cable [Cable ID] from the supplies cabinet.\n\nRegards,\n{Agent}",
      },
      {
        type: "folder",
        name: "Firewall Issues",
        files: [
          {
            type: "file",
            name: "Port Access",
            content:
              "Hello {User},\n\nThe requested ports have been opened on the firewall. Changes will take effect in 15 minutes.\n\nRegards,\n{Agent}",
          },
          {
            type: "file",
            name: "Website Blocked",
            content:
              "Hi {User},\n\nI've reviewed your request. The website {URL} has been unblocked for your department.\n\nBest,\n{Agent}",
          },
        ],
      },
      {
        type: "folder",
        name: "Remote Access",
        files: [
          {
            type: "file",
            name: "Remote Desktop",
            content:
              "Hello {User},\n\nRemote desktop access has been enabled for your account. Use your standard credentials to connect.\n\nRegards,\n{Agent}",
          },
          {
            type: "file",
            name: "Citrix Access",
            content:
              "Hi {User},\n\nYour Citrix workspace has been configured. Launch it from {URL}.\n\nBest,\n{Agent}",
          },
          {
            type: "folder",
            name: "SSH Access",
            files: [
              {
                type: "file",
                name: "Server Connection",
                content:
                  "Hello {User},\n\nSSH access to {Server} has been granted. Your public key has been added.\n\nRegards,\n{Agent}",
              },
              {
                type: "file",
                name: "Key Management",
                content:
                  "Hi {User},\n\nYour SSH key has been rotated. Please update your local configuration with the new key.\n\nBest,\n{Agent}",
              },
            ],
          },
        ],
      },
      {
        type: "folder",
        name: "Bandwidth Issues",
        files: [
          {
            type: "file",
            name: "Speed Test",
            content:
              "Hello {User},\n\nI've run a speed test from your location. Results: {Speed}. This is within normal range.\n\nRegards,\n{Agent}",
          },
          {
            type: "file",
            name: "Network Congestion",
            content:
              "Hi {User},\n\nWe're experiencing network congestion during peak hours. This should resolve by {Time}.\n\nBest,\n{Agent}",
          },
        ],
      },
    ],
  },
  {
    type: "folder",
    name: "Email Issues",
    files: [
      {
        type: "file",
        name: "Email Not Sending",
        content:
          "Hi {User},\n\nI've fixed the issue preventing you from sending emails. Your outbox has been cleared and messages are now being delivered.\n\nBest regards,\n{Agent}",
      },
      {
        type: "file",
        name: "Email Not Receiving",
        content:
          "Hello {User},\n\nYour email is now receiving properly. The issue was with {Cause}. Please check your inbox.\n\nRegards,\n{Agent}",
      },
      {
        type: "folder",
        name: "Spam Filter",
        files: [
          {
            type: "file",
            name: "Whitelist Request",
            content:
              "Hi {User},\n\nI've added {Email} to your whitelist. Messages from this sender will no longer go to spam.\n\nBest,\n{Agent}",
          },
          {
            type: "file",
            name: "Spam Complaints",
            content:
              "Hello {User},\n\nI've investigated the spam issue. The sender has been blocked and reported.\n\nRegards,\n{Agent}",
          },
        ],
      },
      {
        type: "folder",
        name: "Email Forwarding",
        files: [
          {
            type: "file",
            name: "Auto-Forward Setup",
            content:
              "Hi {User},\n\nAuto-forwarding has been configured to send emails to {Email} as requested.\n\nBest,\n{Agent}",
          },
          {
            type: "file",
            name: "Forward Rule",
            content:
              "Hello {User},\n\nYour email rule has been created: {Rule}. All matching emails will be forwarded automatically.\n\nRegards,\n{Agent}",
          },
        ],
      },
      {
        type: "folder",
        name: "Mailbox Management",
        files: [
          {
            type: "file",
            name: "Quota Exceeded",
            content:
              "Hi {User},\n\nYour mailbox is at 95% capacity. Please archive or delete old emails. Current usage: {Size}.\n\nBest,\n{Agent}",
          },
          {
            type: "file",
            name: "Archive Setup",
            content:
              "Hello {User},\n\nYour email archive has been configured. Emails older than {Days} days will be automatically archived.\n\nRegards,\n{Agent}",
          },
          {
            type: "folder",
            name: "Mailbox Migration",
            files: [
              {
                type: "file",
                name: "Migration Scheduled",
                content:
                  "Hi {User},\n\nYour mailbox migration is scheduled for {Date}. Expected downtime: {Duration}.\n\nBest,\n{Agent}",
              },
              {
                type: "file",
                name: "Migration Complete",
                content:
                  "Hello {User},\n\nYour mailbox migration is complete. All emails and settings have been transferred successfully.\n\nRegards,\n{Agent}",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: "folder",
    name: "Security & Compliance",
    files: [
      {
        type: "folder",
        name: "Security Alerts",
        files: [
          {
            type: "file",
            name: "Suspicious Activity",
            content:
              "Hi {User},\n\nWe've detected suspicious activity on your account. As a precaution, your password has been reset. Please contact security.\n\nUrgent,\n{Agent}",
          },
          {
            type: "file",
            name: "Failed Login Attempts",
            content:
              "Hello {User},\n\nMultiple failed login attempts were detected from {Location}. If this wasn't you, please contact security immediately.\n\nRegards,\n{Agent}",
          },
        ],
      },
      {
        type: "folder",
        name: "Data Protection",
        files: [
          {
            type: "file",
            name: "GDPR Request",
            content:
              "Hi {User},\n\nYour GDPR data request has been processed. The report will be sent to your email within 48 hours.\n\nBest,\n{Agent}",
          },
          {
            type: "file",
            name: "Data Breach",
            content:
              "Hello {User},\n\nWe're investigating a potential data breach. Please change your password immediately and enable 2FA.\n\nUrgent,\n{Agent}",
          },
        ],
      },
      {
        type: "folder",
        name: "Compliance Training",
        files: [
          {
            type: "file",
            name: "Mandatory Training",
            content:
              "Hi {User},\n\nYou have mandatory security training due by {Date}. Please complete it at {URL}.\n\nRegards,\n{Agent}",
          },
          {
            type: "file",
            name: "Certification Renewal",
            content:
              "Hello {User},\n\nYour security certification expires on {Date}. Please schedule a renewal session.\n\nBest,\n{Agent}",
          },
        ],
      },
      {
        type: "folder",
        name: "Access Audit",
        files: [
          {
            type: "file",
            name: "Quarterly Review",
            content:
              "Hi {User},\n\nIt's time for your quarterly access review. Please verify your current permissions at {URL}.\n\nRegards,\n{Agent}",
          },
          {
            type: "file",
            name: "Permissions Removed",
            content:
              "Hello {User},\n\nAs per the audit, unused permissions have been removed from your account: {Permissions}.\n\nBest,\n{Agent}",
          },
        ],
      },
    ],
  },
  {
    type: "folder",
    name: "Cloud Services",
    files: [
      {
        type: "folder",
        name: "AWS Support",
        files: [
          {
            type: "file",
            name: "EC2 Instance",
            content:
              "Hi {User},\n\nYour EC2 instance has been launched. Instance ID: {ID}. Access details sent to your email.\n\nBest,\n{Agent}",
          },
          {
            type: "folder",
            name: "S3 Bucket",
            files: [
              {
                type: "file",
                name: "Bucket Created",
                content:
                  "Hello {User},\n\nS3 bucket {Name} has been created with appropriate permissions and encryption enabled.\n\nRegards,\n{Agent}",
              },
              {
                type: "file",
                name: "Bucket Policy",
                content:
                  "Hi {User},\n\nThe bucket policy has been updated with the requested access controls.\n\nBest,\n{Agent}",
              },
            ],
          },
          {
            type: "folder",
            name: "IAM Management",
            files: [
              {
                type: "file",
                name: "User Created",
                content:
                  "Hello {User},\n\nAWS IAM user has been created. Access keys sent securely via {Method}.\n\nRegards,\n{Agent}",
              },
              {
                type: "file",
                name: "Role Assignment",
                content:
                  "Hi {User},\n\nYou've been assigned the {Role} role in AWS with appropriate policies attached.\n\nBest,\n{Agent}",
              },
            ],
          },
        ],
      },
      {
        type: "folder",
        name: "Azure Support",
        files: [
          {
            type: "file",
            name: "Virtual Machine",
            content:
              "Hello {User},\n\nYour Azure VM has been provisioned. Connection details: {Details}.\n\nRegards,\n{Agent}",
          },
          {
            type: "folder",
            name: "App Service",
            files: [
              {
                type: "file",
                name: "Web App Deployed",
                content:
                  "Hi {User},\n\nYour web app has been deployed to Azure. URL: {URL}.\n\nBest,\n{Agent}",
              },
              {
                type: "file",
                name: "Scaling Configured",
                content:
                  "Hello {User},\n\nAuto-scaling has been configured for your app service based on CPU usage.\n\nRegards,\n{Agent}",
              },
            ],
          },
        ],
      },
      {
        type: "folder",
        name: "Google Cloud",
        files: [
          {
            type: "file",
            name: "GCP Project",
            content:
              "Hi {User},\n\nYour GCP project {Name} has been created. Project ID: {ID}.\n\nBest,\n{Agent}",
          },
          {
            type: "file",
            name: "Compute Engine",
            content:
              "Hello {User},\n\nCompute Engine instance is now running. External IP: {IP}.\n\nRegards,\n{Agent}",
          },
        ],
      },
    ],
  },
  {
    type: "folder",
    name: "Backup & Recovery",
    files: [
      {
        type: "file",
        name: "Backup Request",
        content:
          "Hi {User},\n\nYour backup has been initiated. Estimated completion time: {Time}.\n\nBest,\n{Agent}",
      },
      {
        type: "folder",
        name: "Data Recovery",
        files: [
          {
            type: "file",
            name: "File Restoration",
            content:
              "Hello {User},\n\nYour files have been restored from backup dated {Date}. Please verify the data.\n\nRegards,\n{Agent}",
          },
          {
            type: "file",
            name: "System Recovery",
            content:
              "Hi {User},\n\nSystem recovery is complete. All applications and settings have been restored.\n\nBest,\n{Agent}",
          },
          {
            type: "folder",
            name: "Disaster Recovery",
            files: [
              {
                type: "file",
                name: "DR Test",
                content:
                  "Hello {User},\n\nThe disaster recovery test was successful. All systems were restored within the RTO target.\n\nRegards,\n{Agent}",
              },
              {
                type: "file",
                name: "Failover Complete",
                content:
                  "Hi {User},\n\nFailover to the backup site is complete. All services are now running normally.\n\nBest,\n{Agent}",
              },
            ],
          },
        ],
      },
      {
        type: "folder",
        name: "Backup Schedule",
        files: [
          {
            type: "file",
            name: "Schedule Modified",
            content:
              "Hello {User},\n\nYour backup schedule has been updated to run {Frequency} at {Time}.\n\nRegards,\n{Agent}",
          },
          {
            type: "file",
            name: "Backup Failed",
            content:
              "Hi {User},\n\nThe scheduled backup failed due to {Reason}. Investigating and will retry shortly.\n\nBest,\n{Agent}",
          },
        ],
      },
    ],
  },
  {
    type: "folder",
    name: "Telephony & Communication",
    files: [
      {
        type: "folder",
        name: "Phone System",
        files: [
          {
            type: "file",
            name: "Extension Setup",
            content:
              "Hi {User},\n\nYour phone extension {Number} has been configured. Voicemail is enabled.\n\nBest,\n{Agent}",
          },
          {
            type: "file",
            name: "Call Forwarding",
            content:
              "Hello {User},\n\nCall forwarding has been set up to redirect to {Number} when unavailable.\n\nRegards,\n{Agent}",
          },
          {
            type: "folder",
            name: "Conference Bridge",
            files: [
              {
                type: "file",
                name: "Bridge Created",
                content:
                  "Hi {User},\n\nConference bridge created. Dial: {Number}, Code: {Code}.\n\nBest,\n{Agent}",
              },
              {
                type: "file",
                name: "Bridge Settings",
                content:
                  "Hello {User},\n\nConference bridge settings updated: {Settings}.\n\nRegards,\n{Agent}",
              },
            ],
          },
        ],
      },
      {
        type: "folder",
        name: "Video Conferencing",
        files: [
          {
            type: "file",
            name: "Zoom Account",
            content:
              "Hi {User},\n\nYour Zoom Pro account has been activated. You can now host meetings up to 24 hours.\n\nBest,\n{Agent}",
          },
          {
            type: "file",
            name: "Webex Setup",
            content:
              "Hello {User},\n\nWebex has been configured with your company email. Personal room: {URL}.\n\nRegards,\n{Agent}",
          },
        ],
      },
      {
        type: "folder",
        name: "Collaboration Tools",
        files: [
          {
            type: "file",
            name: "Slack Workspace",
            content:
              "Hi {User},\n\nYou've been added to the {Team} Slack workspace. Please check your email for the invitation.\n\nBest,\n{Agent}",
          },
          {
            type: "folder",
            name: "Microsoft Teams",
            files: [
              {
                type: "file",
                name: "Team Created",
                content:
                  "Hello {User},\n\nThe {Name} team has been created in Teams. Members have been added.\n\nRegards,\n{Agent}",
              },
              {
                type: "file",
                name: "Channel Setup",
                content:
                  "Hi {User},\n\nNew channel {Name} has been created with appropriate permissions.\n\nBest,\n{Agent}",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: "folder",
    name: "General Support",
    files: [
      {
        type: "file",
        name: "Ticket Received",
        content:
          "Hi {User},\n\nThank you for contacting IT Support. Your ticket #{TicketNumber} has been received and is being reviewed. Expected response time: {Time}.\n\nBest regards,\n{Agent}",
      },
      {
        type: "file",
        name: "Issue Resolved",
        content:
          "Hello {User},\n\nYour issue has been resolved. Please verify that everything is working correctly and let us know if you need further assistance.\n\nBest,\n{Agent}",
      },
      {
        type: "file",
        name: "Follow Up",
        content:
          "Hi {User},\n\nJust following up on ticket #{TicketNumber}. Has the issue been resolved to your satisfaction?\n\nPlease let me know if you need any further assistance.\n\nRegards,\n{Agent}",
      },
      {
        type: "file",
        name: "Escalation",
        content:
          "Hello {User},\n\nYour ticket has been escalated to [Team/Level]. They will contact you within {Time}.\n\nRegards,\n{Agent}",
      },
      {
        type: "folder",
        name: "Scheduled Maintenance",
        files: [
          {
            type: "file",
            name: "Maintenance Notice",
            content:
              "Hi {User},\n\nScheduled maintenance is planned for {Date} from {StartTime} to {EndTime}. Services affected: {Services}.\n\nBest,\n{Agent}",
          },
          {
            type: "file",
            name: "Maintenance Complete",
            content:
              "Hello {User},\n\nScheduled maintenance has been completed successfully. All services are now operational.\n\nRegards,\n{Agent}",
          },
        ],
      },
    ],
  },
  {
    type: "folder",
    name: "Training & Documentation",
    files: [
      {
        type: "file",
        name: "User Training",
        content:
          "Hi {User},\n\nYour training session for {Topic} is scheduled for {Date} at {Time}. Location: [Location/URL].\n\nBest,\n{Agent}",
      },
      {
        type: "file",
        name: "Documentation Request",
        content:
          "Hello {User},\n\nThe requested documentation for {System} has been sent to your email.\n\nRegards,\n{Agent}",
      },
      {
        type: "folder",
        name: "Knowledge Base",
        files: [
          {
            type: "file",
            name: "Article Created",
            content:
              "Hi {User},\n\nA knowledge base article has been created for this issue: {URL}.\n\nBest,\n{Agent}",
          },
          {
            type: "file",
            name: "Video Tutorial",
            content:
              "Hello {User},\n\nA video tutorial for {Topic} is available at: {URL}.\n\nRegards,\n{Agent}",
          },
        ],
      },
    ],
  },
  {
    type: "folder",
    name: "Procurement & Ordering",
    files: [
      {
        type: "folder",
        name: "Equipment Order",
        files: [
          {
            type: "file",
            name: "Order Placed",
            content:
              "Hi {User},\n\nYour equipment order has been placed. Order number: {OrderID}. Expected delivery: {Date}.\n\nBest,\n{Agent}",
          },
          {
            type: "file",
            name: "Order Received",
            content:
              "Hello {User},\n\nYour order has arrived. Please pick it up from {Location} during {Hours}.\n\nRegards,\n{Agent}",
          },
        ],
      },
      {
        type: "folder",
        name: "Software Licenses",
        files: [
          {
            type: "file",
            name: "License Purchase",
            content:
              "Hi {User},\n\nThe {Software} license has been purchased and will be assigned to your account within 24 hours.\n\nBest,\n{Agent}",
          },
          {
            type: "file",
            name: "License Renewal",
            content:
              "Hello {User},\n\nYour {Software} license will expire on {Date}. Renewal has been initiated.\n\nRegards,\n{Agent}",
          },
        ],
      },
    ],
  },
  {
    type: "file",
    name: "Read Me",
    content: "IT Support Email Snippets - Comprehensive Testing Data",
  },
];
