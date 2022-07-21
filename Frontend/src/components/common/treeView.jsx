import TreeView from "@material-ui/lab/TreeView";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import "./treeView.css";

const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    "&:hover > $content": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:focus > $content, &$selected > $content": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: "var(--tree-view-color)",
    },
    "&:focus > $content $label, &:hover > $content $label, &$selected > $content $label": {
      backgroundColor: "transparent",
    },
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "$expanded > &": {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    "& $content": {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: "inherit",
    color: "inherit",
  },
  labelRoot: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: "inherit",
    flexGrow: 1,
  },
}));

const TreeViewer = ({ items, valueProperty }) => {
  let index = 0;
  const classes = useTreeItemStyles();

  return (
    <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
      {items.map((item) => (
        <TreeItem className="main-tree" nodeId={`${index++}`} label={item.name}>
          {item.cities.map((city) => (
            <TreeItem className="main-tree" nodeId={`${index++}`} label={city.name}>
              {city.locations !== undefined &&
                city.locations.map((location) => (
                  <TreeItem nodeId={`${index++}`} label={location.name}></TreeItem>
                ))}
            </TreeItem>
          ))}
        </TreeItem>
      ))}
    </TreeView>
  );
};

TreeViewer.defaultProps = {
  titleProperty: "name",
  textProperty: "description",
  valueProperty: "_id",
};

export default TreeViewer;
