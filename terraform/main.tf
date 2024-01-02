resource "google_firestore_database" "database" {
  name        = "(default)"
  location_id = "nam5"
  type        = "FIRESTORE_NATIVE"
}

resource "google_firestore_field" "timestamp" {
  database   = google_firestore_database.database.id
  collection = "totp"
  field      = "expiresAt"

  # enables a TTL policy for the document based on the value of entries with this field
  ttl_config {}

  // Disable all single field indexes for the timestamp property.
  index_config {}
}

resource "google_firestore_document" "main_admin" {
  database    = google_firestore_database.database.id
  collection  = "admin"
  document_id = "me@ebrouwer.dev"

  fields = jsonencode({
    email = "me@ebrouwer.dev"
  })
}