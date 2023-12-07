//ENDPOINTS
export const ME_ENDPOINT = "/api/me";
export const SAFE_EXISTS_V2 = `${process.env.NEXT_PUBLIC_BACKEND_URL}/v3/safe`;
export const BASE_GRAPHQL_ENDPOINT_V2 = `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`;
// export const SAFE_BY_WALLET_V2_ENDPOINT = `${process.env.NEXT_PUBLIC_BACKEND_URL}/safe/bywallet`;
export const REQUEST_PRIVATE_BETA_ACCESS_ENDPOINT = `/api/request-access/requestPrivateBetaAccess`;
export const SAFE_BY_WALLET_V2_ENDPOINT = `/api/wallet/getAllSafes`;
export const IMPORT_SAFE_ENDPOINT = "/api/safe/import";
export const FILE_UPLOAD_ENDPOINT = "/api/upload/getSignedURL";
export const PUBLIC_FILE_UPLOAD_ENDPOINT = "/api/upload/getSignedPublicURL";
export const LOGIN_URL = `/api/auth/login`;
export const LOGOUT_URL = `/api/auth/logout`;
export const CONNECTED_SAFES_BY_WALLET_ENDPOINT = "/api/wallet/connectedSafes";
export const GET_ROLES_ENDPOINT = "/api/role/getRoles";
export const CREATE_ROLE_ENDPOINT = "/api/role/addRole";
export const GET_TEAMS_ENDPOINT = "/api/team/getTeamBySafe";
export const CREATE_TEAM_ENDPOINT = "/api/team/createNewTeam";
export const REMOVE_TEAM_ENDPOINT = "/api/team/deactivateTeam";
export const EDIT_TEAM_ENDPOINT = "/api/team/updateTeamName";
export const CREATE_DEAL_ENDPOINT = "/api/safe/createDeal";
export const EDIT_DEAL_ENDPOINT = "/api/deals/editDeal";
export const GET_SAFE_DETAILS_BY_APPROVER_ENDPOINT = "/api/safe/getSafeDetails";
export const GET_SAFE_INVOICE_COUNT_ENDPOINT = "/api/safe/getInvoiceCount";
export const GET_SAFE_PENDING_BILLS_COUNT_ENDPOINT = "/api/safe/getPendingBillsCount";
export const GET_DEALS_LIST_BY_APPROVER_ENDPOINT = "/api/deals/getActiveDealsList";
export const GET_DEALS_LIST_BY_SAFE_ENDPOINT = "/api/deals/getActiveDealsListBySafe";
export const GET_TERMINATED_DEALS_LIST_BY_APPROVER_ENDPOINT = "/api/deals/getTerminatedDealsList";
export const TERMINATE_DEALS_ENDPOINT = "/api/deals/terminateDeal";
export const DEAL_BY_ID_ENDPOINT = "/api/deals/getDealDetailsById";
export const GET_PENDING_INVOICES_PER_DEAL_ENDPOINT = "/api/invoices/getPendingInvoices";
export const GENERATE_INVOICES_ENDPOINT = "/api/invoices/generateInvoice";
export const ADD_LINEITEMS_BY_APPROVER_ENDPOINT = "/api/deals/addLineItemsByApprover";
export const REJECT_LINEITEMS_BY_APPROVER_ENDPOINT = "/api/deals/rejectLineItemsByApprover";
export const UPDATE_LINEITEMS_BY_APPROVER_ENDPOINT = "/api/deals/updateLineItemsByApprover";
export const ADD_ONE_OFF_INVOICE_ENDPOINT = "/api/deals/addOffCycle";
export const UPDATE_OFF_CYCLE_INVOICE_ENDPOINT = "/api/deals/updateOffCycle";
export const REJECT_INVOICE_ENDPOINT = "/api/deals/rejectInvoice";
export const ADD_COMMENTS_TO_LINEITEM_ENDPOINT = "/api/deals/addCommentsToLineItem";
export const GET_ACTIVITIES_ON_LINEITEM_ENDPOINT = "/api/activity/getLineitemActivity";
export const GET_ACTIVITIES_ON_BILL_ENDPOINT = "/api/activity/getBillActivity";
export const GET_ACTIVITIES_ON_EXPENSE_ENDPOINT = "/api/activity/getExpenseActivity";
export const CREATE_SIGNATURE_ENDPOINT = "/api/signature/createNewSignature";
export const CREATE_EXPENSE_SIGNATURE_ENDPOINT = "/api/signature/createNewExpenseSignature";
export const GET_PENDING_INVOICES_FOR_APPROVAL_ENDPOINT = "/api/payments/getPendingApprovalInvoice";
export const GET_RECEIPTS_LIST_ENDPOINT = "/api/receipt/getReceiptsList";
export const GET_RECEIPT_DETAILS_ENDPOINT = "/api/receipt/getReceiptDetailsById";
export const GET_PENDING_INVOICES_FOR_PAYMENT_ENDPOINT = "/api/payments/getPendingPaymentInvoice";
export const GET_DEALS_LIST_BY_CONTRIBUTOR_ENDPOINT =
    "/api/contributor/deals/getActiveDealsListByContributor";
export const GET_DEALS_LIST_OF_CONTRIBUTOR_ENDPOINT = "/api/contributor/deals/getActiveDealsList";
export const GET_DEALS_COUNT_OF_CONTRIBUTOR_ENDPOINT = "/api/contributor/deals/getActiveDealsCount";
export const PAYOUT_NONCE_ENDPOINT = `${process.env.NEXT_PUBLIC_TRANSACTION_SERVICE_ENDPOINT}/api/payout/validate`;
export const EXPENSE_PAYOUT_NONCE_ENDPOINT = `${process.env.NEXT_PUBLIC_TRANSACTION_SERVICE_ENDPOINT}/api/expense/payout`;
export const RECEIPT_DETAIL_POLLING_ENDPOINT = `/api/receipt/getReceiptById`;
export const GET_INVOICES_LIST_FOR_SAFE_ENDPOINT = `/api/invoices/getInvoicesForSafe`;
export const GET_INVOICES_LIST_FOR_DEAL_ENDPOINT = `/api/invoices/getInvoicesByDealId`;
export const GET_DEAL_DETAILS_BY_DEAL_ID_CONTRIBUTOR_ENDPOINT = `/api/contributor/deals/getDealDetailsById`;
export const ADD_LINEITEMS_BY_CONTRIBUTOR_ENDPOINT =
    "/api/contributor/deals/addLineItemsByContributor";
export const GET_INVOICES_LIST_FOR_DEAL_ENDPOINT_CONTRIBUTOR =
    "/api/contributor/invoices/getInvoicesByDealId";
export const GET_WALLET_DETAILS_ENDPOINT = "/api/wallet/me";
export const UPDATE_WALLET_DETAILS_ENDPOINT = "/api/wallet/updateWalletDetails";
export const UPDATE_WALLET_CONFIG_ENDPOINT = "/api/wallet/updateWalletConfig";
export const GET_TERMINATED_DEALS_OF_CONTRIBUTORS_ENDPOINT =
    "/api/contributor/deals/getTerminatedDealsList";
export const GET_INVOICES_LIST_BY_WALLET_ENDPOINT = "/api/contributor/invoices/getInvoicesByWallet";
export const GET_PENDING_INVOICES_LIST_BY_WALLET_ENDPOINT =
    "/api/contributor/invoices/getPendingInvoicesByWallet";
export const GET_PAID_INVOICES_LIST_BY_WALLET_ENDPOINT =
    "/api/contributor/invoices/getPaidInvoicesByWallet";
export const GET_CONTRIBUTOR_RECEIVING_ADDRESSES_ENDPOINT =
    "/api/contributor/wallet/getContributorReceivingWallets";
export const ADD_CONTRIBUTOR_RECEIVING_WALLET_ENDPOINT =
    "/api/contributor/wallet/addReceivingWallet";
export const UPDATE_CONTRIBUTOR_RECEIVING_WALLET_BY_ID_ENDPOINT =
    "/api/contributor/wallet/updateReceivingWalletById";
export const VERIFY_ADD_WALLET_OTP_ENDPOINT = "/api/contributor/wallet/verifyAddWalletOTP";
export const CONTRIBUTOR_GET_SAFE_DETAILS_ENDPOINT = "/api/contributor/safe/getSafeDetails";
export const UPDATE_DEAL_RECEIVING_WALLET_BY_DEAL_ID_ENDPOINT =
    "/api/contributor/deals/updateDealReceivingWalletById";
export const UPDATE_SAFE_DETAILS_ENDPOINT = "/api/safe/updateSafeDetails";

export const EDIT_INVOICE_BY_APPROVER_ENDPOINT = "/api/invoices/editCurrentInvoiceByApprover";
export const SEND_INVITE_ENDPOINT = "/api/sendEmail";
export const DELETE_INVITE_ENDPOINT = "/api/deals/deleteEmail";
export const ACCEPT_INVITE_ENDPOINT = "/api/contributor/deals/acceptDeal";
export const REJECT_INVITE_BY_CONTRIBUTOR_ENDPOINT = "/api/contributor/deals/rejectDeal";
export const ADD_TOKEN_OFFCHAIN_ENDPOINT = "/api/safe/addToken";
export const EDIT_TOKEN_OFFCHAIN_ENDPOINT = "/api/safe/updateToken";
export const SAVE_APPROVERS_AND_THRESHOLD_ENDPOINT = "/api/activate-organisation/save-approvers";
export const SAVE_TOKENS_ENDPOINT = "/api/activate-organisation/save-tokens";
export const SAVE_SAFE_ACTIVATION_DETAILS_ENDPOINT = "/api/activate-organisation/save-safeDetails";
export const PUSH_TXN_TO_BICONOMY_ENDPOINT = "/api/transaction/pushTransaction";
export const UPDATE_PAYROLL_POLICY_ENDPOINT = "/api/safe/updatePayrollPolicy";
export const ADD_POLICY_UPDATE_TXN_DATA_ENDPOINT = "/api/safe/addPolicyUpdateTransactionData";
export const ADD_RESET_ALLOWANCE_TXN_DATA_ENDPOINT = "/api/safe/addResetAllowanceTransactionData";
export const ASSIGN_PAYOUT_NONCE_PER_INVOICE_ENDPOINT = "/api/deals/assignPayoutNonceToInvoice";
export const GET_ALREADY_APPROVED_INVOICE_ENDPOINT =
    "/api/approvals/getAlreadyApprovedInvoicesBySigner";
export const SPLIT_INVOICES = "/api/invoices/splitInvoice";
export const GET_INVOICE_CONFIG = "/api/safe/getInvoiceConfig";
export const UPDATE_INVOICE_CONFIG = "/api/safe/updateInvoiceConfig";

export const ADD_BOOKKEEPER = "add-bookkeeper";
export const ADD_BOOKKEEPER_ENDPOINT = "/api/safe/addBookkeeper";
export const REMOVE_BOOKKEEPER = "remove-bookkeeper";
export const REMOVE_BOOKKEEPER_ENDPOINT = "/api/safe/removeBookkeeper";

export const UPDATE_DISCORD_PREFERENCES_ENDPOINT = "/api/safe/updateDiscordPreferences";
export const SEND_DISCORD_NOTIFICATION_ENDPOINT = "/api/integrations/discord/discordNotification";
export const DISCONNECT_DISCORD_INTEGRATION_ENDPOINT =
    "/api/integrations/discord/disconnectDiscord";

export const SEND_TELEGRAM_NOTIFICATION_ENDPOINT =
    "/api/integrations/telegram/telegramNotification";
export const DISCONNECT_TELEGRAM_INTEGRATION_ENDPONIT =
    "/api/integrations/telegram/disconnectTelegram";
export const UPDATE_TELEGRAM_PREFERENCES_ENDPOINT = "/api/safe/updateTelegramPreferences";

export const SEND_MIXPANEL_EVENT = "/api/integrations/mixpanel";

export const baseURLToSimulate = `${process.env.NEXT_PUBLIC_BACKEND_URL}/utils/simulation`;
export const SIMULATE_INVOICE_ENDPOINT = `${process.env.NEXT_PUBLIC_TRANSACTION_SERVICE_ENDPOINT}/api/payout/simulate`;
export const FETCH_IMAGE_FROM_BACKEND = "/api/fetch-image";
export const FETCH_TOKEN_CONVERSION = "api/fetch-tokenConversion";
export const CREATE_PAYMENT_ENDPOINT = "/api/bill-pay/createPayment";
export const ADD_APPROVER_FOR_PAYMENTS_ENDPOINT = "/api/bill-pay/addApprover";
export const EDIT_PAYMENT_ENDPOINT = "/api/bill-pay/editPayment";
export const SIMULATE_PAYMENTS_ENDPOINT = `${process.env.NEXT_PUBLIC_TRANSACTION_SERVICE_ENDPOINT}/api/payment/simulate`;
export const SIMULATE_EXPENSES_ENDPOINT = `${process.env.NEXT_PUBLIC_TRANSACTION_SERVICE_ENDPOINT}/api/expense/simulate`;

export const ADD_RECIPIENT_ENDPOINT = "/api/safe-recipient/add-recipient";
export const EDIT_RECIPIENT_ENDPOINT = "/api/safe-recipient/edit-recipient";
export const REMOVE_RECIPIENT_ENDPOINT = "/api/safe-recipient/delete-recipient";
export const GET_SAFE_RECIPIENT_ENDPOINT = "/api/safe-recipient/getRecipientsOfSafe";
export const GET_PENDING_BILLS_ENDPOINT = "/api/bill-pay/getPendingBillPay";
export const GET_HISTORY_BILLS_ENDPOINT = "/api/bill-pay/getBillHistory";
export const ON_EXECUTE_PAYMENT_ENDPOINT = "/api/bill-pay/onExecutePayment";
export const PUSH_EXECUTE_PAYROLL_ENDPOINT = "/api/transaction/pushExecuteTransaction";
export const PUSH_REJECT_PAYROLL_ENDPOINT = "/api/transaction/pushRejectTransaction";
export const REGISTER_CANCEL_NONCE_ENDPOINT = "/api/biconomy/registerCancelNonce";
export const UPDATE_PAYMENT_TO_REJECT_ENDPOINT = "/api/bill-pay/rejectPayment";

export const GENERATE_SHORT_URL_ENDPOINT = "/api/url-service/shorten-url";
export const GET_ROOTHASH_FROM_INVOICE_ID = `${process.env.NEXT_PUBLIC_TRANSACTION_SERVICE_ENDPOINT}/api/payout/getRootHash`;
export const GET_ROOTHASH_FROM_EXPENSE_ID = `${process.env.NEXT_PUBLIC_TRANSACTION_SERVICE_ENDPOINT}/api/expense/getRootHash`;
export const CREATE_PROJECT_ENDPOINT = `/api/project/createNewProject`;
export const EDIT_PROJECT_ENDPOINT = `/api/project/updateProject`;
export const DELETE_PROJECT_ENDPOINT = `/api/project/deleteProject`;

export const GET_SAMPLE_CSV_ENDPOINT = `/api/csv/getSampleData`;
export const VALIDATE_CSV_ENDPOINT = `/api/csv/validate`;
export const BULK_ADD_CSV_ENDPOINT = `/api/csv/bulkAdd`;
export const BULK_REJECT_INVOICES_DEAL_ID = "/api/deals/bulkRejectInvoices";

export const CREATE_EXPENSE_ENDPOINT = "/api/expenses/createExpense";
export const EDIT_EXPENSE_ENDPOINT = "/api/expenses/editExpense";
export const GET_PENDING_APPROVAL_EXPENSES_ENDPOINT = "/api/expenses/getPendingApprovalExpenses";
export const GET_PENDING_EXECUTION_EXPENSES_ENDPOINT = "/api/expenses/getPendingExecutionExpenses";
export const GET_HISTORY_EXPENSES_ENDPOINT = "/api/expenses/getExpenseHistory";
export const GET_EXPENSES_BY_ID_ENDPOINT = "/api/expenses/getExpensesById";
export const ON_EXECUTE_EXPENSE_ENDPOINT = "/api/expenses/onExecuteExpense";
export const UPDATE_EXPENSE_TO_REJECT_ENDPOINT = "/api/expenses/rejectExpense";

export const CONTRIBUTOR_CREATE_EXPENSE_ENDPOINT = "/api/contributor/expenses/createExpense";
export const CONTRIBUTOR_EDIT_EXPENSE_ENDPOINT = "/api/contributor/expenses/editExpense";
export const CONTRIBUTOR_WITHDRAW_EXPENSE_ENDPOINT = "/api/contributor/expenses/withdrawExpense";
export const CONTRIBUTOR_GET_EXPENSES_ENDPOINT = "/api/contributor/expenses/getExpenses";
export const CONTRIBUTOR_COUNT_EXPENSES_ENDPOINT = "/api/contributor/expenses/getExpenseCount";

//QUERY_NAME
export const LOGIN = "login";
export const ME = "me";
export const SAFE_DETAILS_V2 = "safe-details-v2";
export const SAFE_BY_WALLET = "safe-by-wallet";
export const SAFE_OWNERS_FROM_GNOSIS = "safe-owners-from-gnosis";
export const GET_TOKENS_BY_SAFE = "get-tokens-by-safe";
export const GET_SAFE_DETAILS_FROM_GNOSIS = "get-safe-details-from-gnosis";
export const GET_NONCE_TRASNSACTION_DETAILS_FROM_GNOSIS =
    "get-nonce-transaction-details-from-gnosis";
export const CONNECTED_SAFES_BY_WALLET = "connected-safes-by-wallet";
export const GET_ROLES = "get-roles";
export const GET_TEAM_BY_SAFE_ADDRESS = "get-team-by-safe-address";
export const GET_SAFE_DETAILS_BY_APPROVER = "get-safe-details-by-approver";
export const GET_SAFE_INVOICE_CONFIG_BY_APPROVER = "get-safe-invoice-config-by-approver";
export const GET_DEALS_LIST_BY_APPROVER = "get-deals-list-by-approver";
export const GET_PENDING_INVOICES_PER_DEAL = "get-pending-invoices-per-deal";
export const GENERATE_INVOICES = "generate-invoices";
export const GET_DEALS_LIST_BY_SAFE = "get-deals-list-by-safe";
export const GET_DEAL_BY_ID = "get-deal-by-id";
export const GET_TERMINATED_DEALS_LIST_BY_APPROVER = "get-terminated-deals-list-by-approver";
export const GET_ACTIVITIES_ON_LINEITEM = "get-activities-on-lineitem";
export const GET_ACTIVITIES_ON_BILL = "get-activities-on-bill";
export const GET_ACTIVITIES_ON_EXPENSE = "get-activities-on-expense";
export const GET_PENDING_INVOICES_FOR_APPROVAL = "get-pending-invoice-for-approval";
export const GET_RECEIPTS_LIST = "get-receipts-list";
export const GET_RECEIPTS_DETAILS = "get-receipts-details";
export const GET_PENDING_INVOICES_FOR_PAYMENT = "get-pending-invoice-for-payment";
export const GET_DEALS_LIST_BY_CONTRIBUTOR = "get-deals-list-by-contributor";
export const GET_DEALS_LIST_OF_CONTRIBUTOR = "get-deals-list-of-contributor";
export const GET_DEALS_COUNT_OF_CONTRIBUTOR = "get-deals-count-of-contributor";
export const GET_INVOICES_LIST_FOR_SAFE = "get-invoices-for-safe";
export const GET_INVOICES_LIST_FOR_DEAL = "get-invoices-for-deal";
export const GET_DEAL_DETAILS_BY_DEAL_ID_CONTRIBUTOR = "get-deal-details-by-deal-id-contributor";
export const GET_WALLET_DETAILS = "get-wallet-details";
export const GET_TERMINATED_DEALS_OF_CONTRIBUTORS = "get-terminated-deals-of-contributor";
export const GET_INVOICES_LIST_BY_WALLET = "get-invoices-list-by-wallet";
export const GET_PENDING_INVOICES_LIST_BY_WALLET = "get-pending-invoices-list-by-wallet";
export const GET_PAID_INVOICES_LIST_BY_WALLET = "get-paid-invoices-list-by-wallet";
export const GET_DUMMY_SAFE = "get-dummy-safe";
export const GET_DUMMY_DEALS = "get-dummy-deals";
export const MIGRATE_DEALS = "migrate-deals";
export const GET_SAFE_RECIPIENTS = "get-safe-recipients";
export const GET_PENDING_BILLS = "get-pending-bills";
export const GET_HISTORY_BILLS = "get-history-bills";

export const GET_PENDING_APPROVAL_EXPENSES = "get-pending-approval-expenses";
export const GET_PENDING_EXECUTION_EXPENSES = "get-pending-execution-expenses";
export const GET_HISTORY_EXPENSES = "get-history-expenses";
export const CONTRIBUTOR_GET_EXPENSES = "contributor-get-expenses";
export const CONTRIBUTOR_COUNT_EXPENSES = "contributor-count-expenses";

export const GET_CONTRIBUTOR_RECEIVING_ADDRESSES = "get-contributor-receiving-addresses";

export const GET_SAMPLE_CSV = `get-sample-csv`;

//MUTATION
export const REQUEST_PRIVATE_BETA_ACCESS = "request-private-beta-access";
export const IMPORT_SAFE_MUTATION = "import-safe-mutation";
export const CREATE_NEW_TEAM = "create-new-team";
export const REMOVE_TEAM = "remove-team";
export const EDIT_TEAM = "edit-team";
export const CREATE_NEW_ROLE = "create-new-role";
export const CREATE_DEAL = "create-deal";
export const EDIT_DEAL = "edit-deal";
export const TERMINATE_DEALS = "terminate-deals";
export const ADD_LINEITEMS_BY_APPROVER = "add-lineitem-by-approver";
export const REJECT_LINEITEMS_BY_APPROVER = "reject-lineitem-by-approver";
export const UPDATE_LINEITEMS_BY_APPROVER = "update-lineitem-by-approver";
export const ADD_ONE_OFF_INVOICE = "add-one-off-invoice";
export const UPDATE_ONE_OFF_INVOICE = "update-one-off-invoice";
export const REJECT_INVOICE = "reject-invoice";
export const ADD_COMMENTS_TO_LINEITEM = "add-comments-to-lineitem";
export const CREATE_SIGNATURE = "create-signature";
export const CREATE_EXPENSE_SIGNATURE = "create-expense-signature";
export const PAYOUT_NONCE = "payout-nonce";
export const EXPENSE_PAYOUT_NONCE = "expense-payout-nonce";
export const ADD_LINEITEMS_BY_CONTRIBUTOR = "add-lineitem-by-contributor";
export const GET_INVOICES_LIST_FOR_DEAL_CONTRIBUTOR = "get-invoice-list-for-deals-contributor-side";
export const UPDATE_WALLET_NAME = "update-wallet-name";
export const UPDATE_WALLET_CONFIG = "update-wallet-config";
export const UPDATE_SETTINGS_CHANGES_FOR_SAFE = "update-settings-changes-for-safe";
export const UPDATE_SAFE_DETAILS = "update-safe-details";
export const SEND_INVITE = "send-invite";
export const EDIT_INVOICE_BY_APPROVER = "edit-invoice-by-approver";
export const DELETE_INVITE = "delete-invite";
export const ACCEPT_INVITE = "accept-invite";
export const REJECT_INVITE_BY_CONTRIBUTOR = "reject-invite-by-contributor";
export const ADD_TOKEN_OFFCHAIN = "ADD_TOKEN_OFFCHAIN";
export const EDIT_TOKEN_OFFCHAIN = "EDIT_TOKEN_OFFCHAIN";
export const SAVE_APPROVERS_AND_THRESHOLD = "SAVE_APPROVERS_AND_THRESHOLD";
export const SAVE_TOKENS = "SAVE_TOKENS";
export const SAVE_SAFE_ACTIVATION_DETAILS = "SAVE_SAFE_ACTIVATION_DETAILS";
export const PUSH_TXN_TO_BICONOMY = "PUSH_TXN_TO_BICONOMY";
export const UPDATE_PAYROLL_POLICY = "UPDATE_PAYROLL_POLICY";
export const ADD_POLICY_UPDATE_TXN_DATA = "ADD_POLICY_UPDATE_TXN_DATA";
export const ADD_RESET_ALLOWANCE_TXN_DATA = "ADD_RESET_ALLOWANCE_TXN_DATA";
export const SIMULATE_INVOICE = `SIMULATE_INVOICE`;
export const SIMULATE_PAYMENT = `SIMULATE_PAYMENT`;
export const SIMULATE_EXPENSE = `SIMULATE_EXPENSE`;
export const UPDATE_SAFE_INVOICE_CONFIG = `UPDATE_SAFE_INVOICE_CONFIG`;
export const UPDATE_DISCORD_PREFERENCES = "update-discord-preferences";
export const ADD_APPROVER_MUTATION_FOR_PAYMENT = "add-approver-mutation-for-payment";
export const GET_SAFE_INVOICE_COUNT = "get-safe-invoice-count";
export const GET_SAFE_PENDING_BILLS_COUNT = "get-safe-pending-bills-count";
export const ADD_RECIPIENT = "add-recipient";
export const REMOVE_RECIPIENT = "remove-recipient";
export const EDIT_RECIPIENT = "edit-recipient";
export const ON_EXECUTE_PAYMENT = "on-execute-payment";
export const ON_EXECUTE_EXPENSE = "on-execute-expense";
export const PUSH_EXECUTE_TRANSACTION = "push-execute-transaction";
export const PUSH_REJECT_NONCE = "push-reject-nonce";
export const REGISTER_CANCEL_NONCE = "register-cancel-nonce";
export const UPDATE_PAYMENT_TO_REJECT = "update-payment-to-reject";
export const UPDATE_EXPENSE_TO_REJECT = "update-expense-to-reject";
export const UPDATE_TELEGRAM_PREFERENCES = "update-telegram-preferences";
export const CREATE_PROJECT = `create-project`;
export const EDIT_PROJECT = `edit-project`;
export const DELETE_PROJECT = `delete-project`;
export const VALIDATE_CSV = `validate-csv`;
export const BULK_ADD_CSV = `bulk-add-csv`;
export const BULK_REJECTED_INVOICES = "bulk-rejected-invoices";
export const ADD_CONTRIBUTOR_RECEIVING_WALLET = "add-contributor-receiving-wallet";
export const UPDATE_CONTRIBUTOR_RECEIVING_WALLET_BY_ID =
    "update-contributor-receiving-wallet-by-id";
export const UPDATE_DEAL_RECEIVING_WALLET_BY_DEAL_ID = "update-deal-receiving-wallet-by-id";
export const VERIFY_ADD_WALLET_OTP = "verify-add-wallet-otp";
export const CONTRIBUTOR_GET_SAFE_DETAILS = "contributor-get-safe-details";

// Whitelisted token constants
// USD 1, AUD 1.58 and EURO 0.95
export const WHITELISTED_TOKENS = {
    "0xEAFFD40B5c50aF6373F46632C1B13BB537b5b7B8": {
        address: "0xEAFFD40B5c50aF6373F46632C1B13BB537b5b7B8",
        logoURI:
            "https://safe-transaction-assets.safe.global/tokens/logos/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48.png",
        fiatValue: 1,
        fiatValues: {
            usd: 1,
            aud: 1.58,
            eur: 0.95,
            // inr: 0,
        },
    },
    "0x07865c6E87B9F70255377e024ace6630C1Eaa37F": {
        address: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
        logoURI:
            "https://safe-transaction-assets.safe.global/tokens/logos/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48.png",
        fiatValue: 1,
        fiatValues: {
            usd: 1,
            aud: 1.58,
            eur: 0.95,
            // inr: 0,
        },
    },
};
