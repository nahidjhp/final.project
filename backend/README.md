# FluentDoor — Backend

Django REST Framework API. See the root `README.md` (one level up) for setup instructions covering both this backend and the `../frontend` app together.

## Quick reference

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

- Admin panel: `http://localhost:8000/admin/` (run `python manage.py createsuperuser` first)
- API docs (drf-spectacular): `http://localhost:8000/api/schema/swagger-ui/` if configured in `urls.py`
- Additional notes on individual apps are in `docs/` (`structure.docs`, `courses.docs`, `student.docs`)

## Apps

- `accounts` — auth (JWT-in-cookie), registration, `/api/me/`
- `students` — student profile + dashboard
- `tutors` — tutor profile, approval status, tutor dashboard
- `courses` — courses, lessons, homework, reviews, enrollments (with payment-proof review)
- `blog` — blog posts
