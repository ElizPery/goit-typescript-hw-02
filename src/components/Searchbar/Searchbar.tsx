import { FormEvent } from "react";
import css from "./Searchbar.module.css";
import { GrSearch } from "react-icons/gr";
// import PropTypes from "prop-types";

const Searchbar: React.FC<{onSubmit: (e: FormEvent<HTMLFormElement>) => void}> = ({ onSubmit}) => {
  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={onSubmit}>
        <button type="submit" className={css.searchFormButton}>
          <span className={css.searchFormButtonLabel}>Search</span>
          <GrSearch className={css.searchFormButtonIcon} />
        </button>

        <input
          className={css.searchFormInput}
          type="text"
          placeholder="Search images and photos"
          name="search"
        />
      </form>
    </header>
  );
};

export default Searchbar;

// Searchbar.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };
