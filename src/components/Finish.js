import { Box, Link, Typography } from '@material-ui/core';
import useDatabaseRef from "../hooks/useDatabaseRef";

function Finish({ finishId }) {
  const [finish, loading] = useDatabaseRef(`/finishes/${finishId}`, true);

  if (loading) {
    return (
      <div>Puzzle is loading!</div>
    )
  } else {
    return (
      <div>
        <Typography variant="h2">{finish.header}</Typography>
        {finish.text.map(text => {
          return text.link ? (
            <Box m={2}>
              <Typography>
                <Link href={text.content} target={"_blank"}>
                  {text.content}
                </Link>
              </Typography>
            </Box>
          ) : (
            <Box m={2}>
              <Typography>{text.content}</Typography>
            </Box>
          )
        })}
      </div>
    )
  }
}

export default Finish;