 

export function ReplyBox({
  avatar,
  value,
  onChange,
  onSubmit,
  loading,
}) {
  return (

    <div className="Reply_block">
      <div className="profilereplybox_wrapper">
        <div className="Pfp_inter_comments Pfp_inter_comments--reply">
          <img src={avatar} />
        </div>

        <div className="textarea_wrapper textarea_wrapper--reply">
          <textarea
            placeholder="Write a reply..."
            className="Comment_text Comment_text--reply"
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          />
          <button
            className="Submit_comment Submit_comment--reply"
            style={{ display: value ? "block" : "none" }}
            onClick={onSubmit}
            disabled={loading}
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  );
}


