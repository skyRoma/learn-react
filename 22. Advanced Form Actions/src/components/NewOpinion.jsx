import { useActionState } from "react";
import { OpinionsContext } from "../store/opinions-context";
import { use } from "react";
import { Submit } from "./Submit";

export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext)

  async function shareOpinionAction(prevState, formData) {
    const userName = formData.get("userName");
    const title = formData.get("title");
    const body = formData.get("body");

    const errors = [];

    if (!userName.trim()) {
      errors.push('Username is invalid');
    }

    if (title.trim().length < 5) {
      errors.push('Title is invalid');
    }

    if (body.trim().length < 10 || body.trim().length > 300) {
      errors.push('Body is invalid');
    }

    if (errors.length > 0) {
      return {
        errors,
        enteredValues: {
          userName,
          title,
          body
        }
      }
    }

    await addOpinion({
      userName,
      title,
      body
    });

    return {
      errors: null
    }
  }

  const [formState, formAction] = useActionState(shareOpinionAction, { errors: null })

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValues?.userName} />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValues?.title} />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValues?.body}>
          </textarea>
        </p>

        {formState.errors && (
          <ul>
            {formState.errors.map(error => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <Submit />
      </form>
    </div>
  );
}
