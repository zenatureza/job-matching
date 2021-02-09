from get_best_candidates import get_best_candidates
from flask import Flask, jsonify, request, abort
import os
from dotenv import load_dotenv

load_dotenv()

server = Flask(__name__)


def validate_params(
    city_id, start_experience_range, end_experience_range, technologies_ids, state_initials
):
    if (city_id is None or
        start_experience_range is None or
        len(technologies_ids) <= 0 or
            state_initials is None):
        abort(400)


@server.route("/")
def get():
    city_id = request.args.get('cityId')
    start_experience_range = request.args.get('startExperienceRange')
    end_experience_range = request.args.get('endExperienceRange')
    technologies_ids = request.args.getlist('technologiesIds[]')
    state_initials = request.args.get('stateInitials')

    validate_params(city_id, start_experience_range,
                    end_experience_range, technologies_ids, state_initials)

    best_candidates = get_best_candidates(
        city_id,
        int(start_experience_range),
        int(end_experience_range),
        technologies_ids,
        state_initials
    )

    if best_candidates is None or len(best_candidates) < 5:
        return

    response = {
        'candidates': best_candidates[:5]
    }

    return jsonify(response)


if __name__ == "__main__":
    flask_host = os.environ.get('FLASK_HOST')
    print(flask_host)
    server.run(host=flask_host)
